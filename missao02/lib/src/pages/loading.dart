import 'package:flutter/material.dart';
import 'dart:async';

class Loading extends StatefulWidget {
  final String text;
  final Color color;
  final double size;
  final Color backgroundColor;

  const Loading({super.key, 
    this.text = 'Carregando...',
    this.color = const Color(0xFF1888F8),
    this.size = 35.0,
    this.backgroundColor = const Color(0xFFE8F1F2),
  });

  @override
  _LoadingState createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {
  @override
  void initState() {
    super.initState();

    // Navega para a tela de login após 3 segundos
    Future.delayed(const Duration(seconds: 4), () {
      Navigator.pushReplacementNamed(context, '/home');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: widget.backgroundColor,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset('lib/src/assets/logo.png', height: 300),
            const SizedBox(height: 20),
            Text(
              widget.text,
              style: const TextStyle(
                fontSize: 18,
                color: Color.fromARGB(255, 90, 90, 90),
                decoration: TextDecoration.none, 
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              height: widget.size,
              width: widget.size,
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(widget.color),
                strokeWidth: 4.0,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
