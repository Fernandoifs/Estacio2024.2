import 'package:flutter/material.dart';

class AdicionarAvaliacao extends StatelessWidget {
  final Function(String, String, int) onAvaliar;

  const AdicionarAvaliacao({super.key, required this.onAvaliar});

  @override
  Widget build(BuildContext context) {
    final TextEditingController nomeController = TextEditingController();
    final TextEditingController comentarioController = TextEditingController();
    int avaliacao = 3;

    return AlertDialog(
      title: const Text(
        'Adicionar Avaliação',
        style: TextStyle(fontSize: 20), 

      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14), 
      ),
      content: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: nomeController,
              decoration: const InputDecoration(
                labelText: 'Nome',
              ),
            ),
            TextField(
              controller: comentarioController,
              decoration: const InputDecoration(
                labelText: 'Comentário',
              ),
            ),
            DropdownButton<int>(
              value: avaliacao,
              items: List.generate(5, (index) {
                return DropdownMenuItem<int>(
                  value: index + 1,
                  child: Text('${index + 1} Estrela${index > 0 ? 's' : ''}'),
                );
              }),
              onChanged: (value) {
                if (value != null) {
                  avaliacao = value;
                }
              },
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('Cancelar'),
        ),
        TextButton(
          onPressed: () {
            if (nomeController.text.isEmpty ||
                comentarioController.text.isEmpty) {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: const Text('Erro'),
                    content: const Text('Por favor, preencha todos os campos.'),
                    actions: [
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text('OK'),
                      ),
                    ],
                  );
                },
              );
              return;
            }

            // Chamar o callback com os valores
            onAvaliar(
                nomeController.text, comentarioController.text, avaliacao);
            Navigator.of(context).pop();
          },
          child: const Text('Adicionar'),
        ),
      ],
    );
  }
}
