import 'package:exemplo/src/pages/Reserva.dart';
import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';

class LayoutScreen extends StatefulWidget {
  final String imagePath;
  final String title;
  final String subTitle;
  final String description;
  final String valor;

  const LayoutScreen({
    super.key,
    required this.imagePath,
    required this.title,
    required this.subTitle,
    required this.description,
    required this.valor,
  });

  @override
  _LayoutScreenState createState() => _LayoutScreenState();
}

class _LayoutScreenState extends State<LayoutScreen> {
  bool isFavorited = false;
  int favoriteCount = 28;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: ListView(
        children: [
          Image.asset(
            widget.imagePath,
            width: 600,
            height: 240,
            fit: BoxFit.cover,
          ),
          const SizedBox(height: 8),

          Padding(
            padding: const EdgeInsets.all(40.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.title,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  widget.subTitle,
                  style: const TextStyle(
                    color: Colors.grey,
                  ),
                ),
                const SizedBox(height: 6),
                SizedBox(
                  height: 180,
                  child: SingleChildScrollView(
                    child: Text(
                      widget.description,
                      style: const TextStyle(fontSize: 16),
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [

                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        _buildButtonColumn(
                            Icons.call, 'LIGAR', _callPhoneNumber),
                        const SizedBox(width: 20),
                        _buildButtonColumn(Icons.near_me, 'ROTAS', _openMaps),
                        const SizedBox(width: 20), 
                        _buildButtonColumn(
                            Icons.share, 'COMPARTILHAR', _shareContent),
                      ],
                    ),
                    Row(
                      children: [
                        IconButton(
                          icon: Icon(
                            isFavorited ? Icons.star : Icons.star_border,
                            color: Colors.red,
                          ),
                          onPressed: _toggleFavorite,
                        ),
                        Text('$favoriteCount'),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),

          Padding(
            padding:
                const EdgeInsets.symmetric(horizontal: 40.0, vertical: 20.0),
            child: ElevatedButton(
              onPressed: () {          
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ReservaPage(valor: widget.valor),
                  ),
                );
              },
              child: const Text('Criar Reserva'),
            ),
          ),
        ],
      ),
    );
  }

  // Função Ligar
  void _callPhoneNumber() async {
    const phoneNumber = '5535124578';
    final Uri phoneUri = Uri(scheme: 'tel', path: phoneNumber);

    if (await canLaunchUrl(phoneUri)) {
      await launchUrl(phoneUri);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Não foi possível realizar a ligação')),
      );
    }
  }

  // Função rotas
  void _openMaps() async {
    const double latitude = -23.5594;
    const double longitude = -46.6547;
    final googleMapsUrl = Uri.parse(
        'https://www.google.com/maps/@?api=1&map_action=map&center=$latitude,$longitude&zoom=16');

    if (await canLaunchUrl(googleMapsUrl)) {
      await launchUrl(googleMapsUrl);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Não foi possível abrir o Google Maps')),
      );
    }
  }

  // Função compartilhar
  void _shareContent() {
    final content =
        '${widget.title}\n${widget.subTitle}\n\n${widget.description}';
    Share.share(content);
  }

  void _toggleFavorite() {
    setState(() {
      if (isFavorited) {
        favoriteCount--;
        isFavorited = false;
      } else {
        favoriteCount++;
        isFavorited = true;
      }
    });
  }

  Column _buildButtonColumn(IconData icon, String label,
      [VoidCallback? onTap]) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton(
          icon: Icon(icon, color: Colors.blue),
          onPressed: onTap,
        ),
        const SizedBox(height: 8),
        Text(
          label,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w400,
            color: Colors.blue,
          ),
        ),
      ],
    );
  }
}
