package com.example.audiohelper.presentation

import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.SpeechRecognizer
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.content.Intent
import android.speech.RecognizerIntent
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Mic
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.wear.compose.material.*
import androidx.wear.tooling.preview.devices.WearDevices
import com.example.audiohelper.presentation.theme.AudioHelperTheme
import com.example.audiohelper.services.NotificationService
import java.util.*

class MainActivity : ComponentActivity() {

    private lateinit var tts: TextToSpeech
    private lateinit var speechRecognizer: SpeechRecognizer
    private lateinit var notificationService: NotificationService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Inicialização do Text-to-Speech (TTS)
        tts = TextToSpeech(this) { status ->
            if (status == TextToSpeech.SUCCESS) {
                tts.language = Locale("pt", "BR")
                // TTS fala uma mensagem inicial e depois chama o reconhecimento de voz
                tts.speak("Aguardando comando de voz", TextToSpeech.QUEUE_FLUSH, null, "INIT")
            }
        }

        // Listener que ativa o reconhecimento de voz após a fala inicial do TTS
        tts.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(utteranceId: String?) {}

            override fun onDone(utteranceId: String?) {
                if (utteranceId == "INIT") {
                    // Inicia o reconhecimento de voz após a fala inicial
                    startVoiceCommand()
                }
            }

            override fun onError(utteranceId: String?) {
                Log.e("TTS", "Erro ao iniciar o comando de voz")
            }
        })

        // Inicialização do reconhecimento de voz
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this)
        speechRecognizer.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(params: Bundle?) {}
            override fun onBeginningOfSpeech() {}
            override fun onRmsChanged(rmsdB: Float) {}
            override fun onBufferReceived(buffer: ByteArray?) {}
            override fun onEndOfSpeech() {}
            override fun onError(error: Int) {
                tts.speak("Erro ao reconhecer a fala", TextToSpeech.QUEUE_FLUSH, null, null)
            }

            override fun onResults(results: Bundle?) {
                val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                if (matches != null && matches.isNotEmpty()) {
                    val spokenText = matches[0]
                    tts.speak("Você disse: $spokenText", TextToSpeech.QUEUE_FLUSH, null, null)

                    when {
                        spokenText.contains("exibir notificações", ignoreCase = true) -> {
                            readNotifications()
                        }
                        spokenText.contains("que dia é hoje", ignoreCase = true) ||
                                spokenText.contains("que hora é", ignoreCase = true) -> {
                            tellDateTime()
                        }
                        else -> {
                            tts.speak("Comando não reconhecido", TextToSpeech.QUEUE_FLUSH, null, null)
                        }
                    }
                }
            }

            override fun onPartialResults(partialResults: Bundle?) {}
            override fun onEvent(eventType: Int, params: Bundle?) {}
        })

        // Serviço de notificações
        notificationService = NotificationService()

        // Conteúdo da interface gráfica
        setContent {
            WearApp(::readNotifications, ::startVoiceCommand)
        }
    }

    // Função para ler notificações usando o TTS
    private fun readNotifications() {
        val notifications = notificationService.getNotifications()
        if (notifications.isNotEmpty()) {
            notifications.forEach { notification ->
                tts.speak(notification, TextToSpeech.QUEUE_FLUSH, null, null)
            }
        } else {
            tts.speak("Não há novas mensagens", TextToSpeech.QUEUE_FLUSH, null, null)
        }
    }

    // Função para iniciar o reconhecimento de voz
    private fun startVoiceCommand() {
        tts.speak("Comando por voz ativado", TextToSpeech.QUEUE_FLUSH, null, "VOICE_CMD")
        tts.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(utteranceId: String?) {}

            override fun onDone(utteranceId: String?) {
                // Inicia o reconhecimento de voz após a fala
                val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
                    putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                    putExtra(RecognizerIntent.EXTRA_LANGUAGE, "pt-BR")
                    putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
                }
                speechRecognizer.startListening(intent)
            }

            override fun onError(utteranceId: String?) {}
        })
    }

    // Função para informar data e hora
    private fun tellDateTime() {
        val calendar = Calendar.getInstance()
        val day = calendar.get(Calendar.DAY_OF_MONTH)
        val month = calendar.get(Calendar.MONTH) + 1 // Janeiro é 0
        val year = calendar.get(Calendar.YEAR)
        val hour = calendar.get(Calendar.HOUR_OF_DAY)
        val minute = calendar.get(Calendar.MINUTE)

        val date = "$day/$month/$year"
        val time = "$hour horas e $minute minutos"

        tts.speak("Hoje é $date e a hora é $time", TextToSpeech.QUEUE_FLUSH, null, null)
    }

    override fun onDestroy() {
        super.onDestroy()
        tts.shutdown()
        speechRecognizer.destroy()
    }
}

@Composable
fun WearApp(onReadNotifications: () -> Unit, onStartVoiceCommand: () -> Unit) {
    AudioHelperTheme {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colors.background),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.Start,
                verticalArrangement = Arrangement.Center,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp)
            ) {
                Spacer(modifier = Modifier.height(24.dp))

                Button(
                    onClick = { onStartVoiceCommand() },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(8.dp),
                    colors = ButtonDefaults.buttonColors(backgroundColor = Color.Gray)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Icon(
                            imageVector = Icons.Default.Mic,
                            contentDescription = "Comando de Voz",
                            tint = Color.White,
                            modifier = Modifier.padding(start = 15.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Comando de Voz", color = Color.White)
                    }
                }
            }
        }
    }
}

@Preview(device = WearDevices.SMALL_ROUND, showSystemUi = true)
@Composable
fun DefaultPreview() {
    WearApp({}, {})
}
