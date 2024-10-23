package com.example.audiohelper.presentation.theme

import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.wear.compose.material.*

@Composable
fun AudioHelperTheme(content: @Composable () -> Unit) {
    val colors = Colors(
        primary = Color(0xFF6200EE),
        primaryVariant = Color(0xFF3700B3),
        secondary = Color(0xFF03DAC5),
        background = Color.White,
        surface = Color.White,
        error = Color.Red,
        onPrimary = Color.White,
        onSecondary = Color.Black,
        onBackground = Color.Black,
        onSurface = Color.Black,
        onError = Color.White
    )

    MaterialTheme(
        colors = colors,
        content = content
    )
}
