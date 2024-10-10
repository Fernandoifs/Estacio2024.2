import 'package:flutter/material.dart';
import 'package:exemplo/src/pages/layout.dart';
import 'package:exemplo/src/pages/loading.dart';
import 'package:exemplo/src/pages/home.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  get imagePath => null;
  get title => null;
  get subTitle => null;
  get description => null;
  get valor => null;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter App',
      initialRoute: '/',
      routes: {
        '/': (context) => const Loading(),
        '/home': (context) => const HomeScreen(),
        '/layout': (context) => LayoutScreen(
              imagePath: imagePath,
              title: title,
              subTitle: subTitle,
              description: description,
              valor: valor,
            )
      },
    );
  }
}
