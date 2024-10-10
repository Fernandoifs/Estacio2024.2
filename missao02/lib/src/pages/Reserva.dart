import 'package:flutter/material.dart';

class ReservaPage extends StatefulWidget {
  final String valor;

  const ReservaPage({super.key, required this.valor});

  @override
  _ReservaPageState createState() => _ReservaPageState();
}

class _ReservaPageState extends State<ReservaPage> {
  final _formKey = GlobalKey<FormState>();

  // Controladores para os campos de texto
  final TextEditingController _nomeController = TextEditingController();
  final TextEditingController _sobrenomeController = TextEditingController();
  final TextEditingController _cpfController = TextEditingController();
  final TextEditingController _dataNascimentoController =
      TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _celularController = TextEditingController();
  int _adultos = 1;
  int _criancas = 0;
  String _sexo = 'Masculino';

  String _metodoPagamento = 'PIX';
  double _totalAPagar = 0.0;

  @override
  void initState() {
    super.initState();
    _calcularTotal();
  }

  void _calcularTotal() {
    double valorReserva = double.tryParse(widget.valor) ?? 0.0;
    double valorCrianca = valorReserva * 0.5;
    setState(() {
      _totalAPagar = valorReserva * _adultos + (valorCrianca * _criancas);
    });
  }

  // Validações
  String? _validarCPF(String? value) {
    if (value == null || value.isEmpty) {
      return 'Por favor, insira o CPF';
    }
    final cpf = value.replaceAll(RegExp(r'[^0-9]'), '');
    if (cpf.length != 11) {
      return 'CPF deve conter 11 dígitos';
    }
    return null;
  }

  String? _validarDataNascimento(String? value) {
    if (value == null || value.isEmpty) {
      return 'Por favor, insira a data de nascimento';
    }

    final RegExp dataRegExp =
        RegExp(r'^([0-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/\d{4}$');
    if (!dataRegExp.hasMatch(value)) {
      return 'Formato inválido. Use DD/MM/AAAA';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Reserva'),
        backgroundColor: const Color(0xFF2596be),
        titleTextStyle: const TextStyle(
          color: Colors.white,
          fontSize: 18,
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _nomeController,
                decoration: const InputDecoration(labelText: 'Nome'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o nome';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _sobrenomeController,
                decoration: const InputDecoration(labelText: 'Sobrenome'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o sobrenome';
                  }
                  return null;
                },
              ),
              // CPF
              TextFormField(
                controller: _cpfController,
                decoration: const InputDecoration(labelText: 'CPF'),
                validator: _validarCPF,
              ),
              // Data de Nascimento
              TextFormField(
                controller: _dataNascimentoController,
                decoration: const InputDecoration(
                    labelText: 'Data de Nascimento (DD/MM/AAAA)'),
                validator: _validarDataNascimento,
              ),
              // Sexo
              DropdownButtonFormField<String>(
                value: _sexo,
                decoration: const InputDecoration(labelText: 'Sexo'),
                onChanged: (String? newValue) {
                  setState(() {
                    _sexo = newValue!;
                  });
                },
                items: <String>['Masculino', 'Feminino', 'Outro']
                    .map<DropdownMenuItem<String>>((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value),
                  );
                }).toList(),
              ),
              // Email
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o email';
                  }
                  return null;
                },
              ),
              // Celular
              TextFormField(
                controller: _celularController,
                decoration: const InputDecoration(labelText: 'Celular'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira o celular';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16.0),
              // Número de adultos
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Número de adultos'),
                  DropdownButton<int>(
                    value: _adultos,
                    onChanged: (int? newValue) {
                      setState(() {
                        _adultos = newValue!;
                        _calcularTotal();
                      });
                    },
                    items: List.generate(10, (index) => index + 1)
                        .map<DropdownMenuItem<int>>((int value) {
                      return DropdownMenuItem<int>(
                        value: value,
                        child: Text(value.toString()),
                      );
                    }).toList(),
                  ),
                ],
              ),
              // Número de crianças
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Número de crianças'),
                  DropdownButton<int>(
                    value: _criancas,
                    onChanged: (int? newValue) {
                      setState(() {
                        _criancas = newValue!;
                        _calcularTotal();
                      });
                    },
                    items: List.generate(10, (index) => index)
                        .map<DropdownMenuItem<int>>((int value) {
                      return DropdownMenuItem<int>(
                        value: value,
                        child: Text(value.toString()),
                      );
                    }).toList(),
                  ),
                ],
              ),
              const SizedBox(height: 16.0),
              // Método de pagamento
              const Text('Método de Pagamento'),
              ListTile(
                title: const Text('PIX'),
                leading: Radio<String>(
                  value: 'PIX',
                  groupValue: _metodoPagamento,
                  onChanged: (String? value) {
                    setState(() {
                      _metodoPagamento = value!;
                    });
                  },
                ),
              ),
              ListTile(
                title: const Text('Cartão de Crédito'),
                leading: Radio<String>(
                  value: 'Cartão de Crédito',
                  groupValue: _metodoPagamento,
                  onChanged: (String? value) {
                    setState(() {
                      _metodoPagamento = value!;
                    });
                  },
                ),
              ),

              const SizedBox(height: 16.0),

              // Total a pagar
              Text(
                'Total a pagar: R\$${_totalAPagar.toStringAsFixed(2)}',
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ElevatedButton(
          onPressed: () {
            if (_formKey.currentState!.validate()) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Reserva feita com sucesso!')),
              );
              Future.delayed(const Duration(seconds: 1), () {
                Navigator.pushReplacementNamed(context, '/home');
              });
            }
          },
          child: const Text('Finalizar Reserva'),
        ),
      ),
    );
  }
}
