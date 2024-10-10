import 'package:flutter/material.dart';

class AvaliacaoWidget extends StatelessWidget {
  final String nome;
  final String comentario;
  final int avaliacao;

  const AvaliacaoWidget({
    super.key,
    required this.nome,
    required this.comentario,
    required this.avaliacao,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
                top: 26.0, left: 36.0, right: 36.0, bottom: 10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '$nome: $comentario',
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.normal,
            ),
          ),
          Row(
            children: List.generate(
              5,
              (index) => Icon(
                index < avaliacao ? Icons.star : Icons.star_border,
                color: Colors.amber,
                size: 20,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
