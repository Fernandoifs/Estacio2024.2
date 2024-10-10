import 'package:exemplo/src/components/adicionarAvaliacao.dart';
import 'package:exemplo/src/components/avaliacao.dart';
import 'package:exemplo/src/components/carousel.dart';
import 'package:exemplo/src/components/carouselItem.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'dart:async'; 

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Map<String, dynamic>> _avaliacoes = [];
  late List<String> destinos; 
  late PageController _pageController;
  final TextEditingController _searchController =
      TextEditingController();
  int _currentIndex = 0;
  Timer? _timer; 

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _carregarAvaliacoes();
    _carregarDestinos();

    // Inicia o Timer para rolagem automática
    _timer = Timer.periodic(const Duration(seconds: 3), (timer) {
      if (_currentIndex < destinos.length - 1) {
        _currentIndex++;
      } else {
        _currentIndex = 0;
      }
      _pageController.animateToPage(
        _currentIndex,
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    });
  }

  Future<void> _carregarAvaliacoes() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? avaliacoesString = prefs.getString('avaliacoes');

    if (avaliacoesString != null) {
      final List<dynamic> avaliacoesJson = json.decode(avaliacoesString);
      setState(() {
        _avaliacoes = List<Map<String, dynamic>>.from(avaliacoesJson);
      });
    }
  }

  void _carregarDestinos() {
    destinos = carrosselData.map((item) => item['title'] as String).toList();
  }

  Future<void> _salvarAvaliacoes() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('avaliacoes', json.encode(_avaliacoes));
  }

  void _exibirDialogoAvaliacao(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AdicionarAvaliacao(
          onAvaliar: (nome, comentario, avaliacao) {
            setState(() {
              _avaliacoes.add({
                'nome': nome,
                'comentario': comentario,
                'avaliacao': avaliacao,
              });
            });
            _salvarAvaliacoes();
          },
        );
      },
    );
  }

  void _pesquisarDestino(String query) {
    final String queryLower = query.toLowerCase();
    final destinoIndex =
        destinos.indexWhere((destino) => destino.toLowerCase() == queryLower);

    if (destinoIndex != -1) {
      _pageController.jumpToPage(destinoIndex); 
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Destino não encontrado')),
      );
    }
     _searchController.clear();
  }

  @override
  void dispose() {
    _pageController.dispose(); 
    _timer?.cancel(); 
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Agência de Viagens'),
        backgroundColor: const Color(0xFF2596be),
        titleTextStyle: const TextStyle(
          color: Colors.white,
          fontSize: 18,
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(
                top: 26.0,
                left: 26.0,
                right: 26.0,
                bottom: 10.0,
              ),
              child: TextField(
                controller: _searchController,
                decoration: InputDecoration(
                  labelText: 'Pesquisar destinos',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                  suffixIcon: IconButton(
                    icon: const Icon(Icons.search),
                    onPressed: () {
                      _pesquisarDestino(_searchController.text);
                    },
                  ),
                ),
                onSubmitted: _pesquisarDestino,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: SizedBox(
                height: 250,
                child: PageView.builder(
                  controller: _pageController,
                  itemCount: destinos.length,
                  onPageChanged: (index) {
                    setState(() {
                      _currentIndex = index; 
                    });
                  },
                  itemBuilder: (context, index) {
                    return carrosselItems(context)[index]; 
                  },
                ),
              ),
            ),
            // Indicador de página
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: destinos.map((destination) {
                int index = destinos.indexOf(destination);
                return Container(
                  width: 8.0,
                  height: 8.0,
                  margin: const EdgeInsets.symmetric(
                      vertical: 10.0, horizontal: 4.0),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: _currentIndex == index
                        ? const Color(0xFF2596be)
                        : const Color(0xFFBDBDBD),
                  ),
                );
              }).toList(),
            ),
            // Campo de avaliações dos usuários
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 36.0, vertical: 10.0),
              child: Text(
                'Avaliações de Usuários',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ..._avaliacoes.map((avaliacao) => AvaliacaoWidget(
                  nome: avaliacao['nome'],
                  comentario: avaliacao['comentario'],
                  avaliacao: avaliacao['avaliacao'],
                )),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: () {
                _exibirDialogoAvaliacao(context);
              },
              child: const Text('Adicionar Avaliação'),
            ),
          ],
        ),
      ),
    );
  }
}
