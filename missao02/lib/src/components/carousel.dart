import 'package:exemplo/src/components/carouselItem.dart';
import 'package:flutter/material.dart';
import 'package:exemplo/src/pages/layout.dart';

List<Widget> carrosselItems(BuildContext context) {
  return carrosselData.map((item) {
    return CarrosselItem(
      imagePath: item['imagePath']!,
      text: item['title']!,
      onTap: () => _navigateToLayoutScreen(
        context,
        item['imagePath']!,
        item['title']!,
        item['subTitle']!,
        item['description']!,
        item['valor']!,
      ),
    );
  }).toList();
}

void _navigateToLayoutScreen(BuildContext context, String imagePath,
    String title, String subTitle, String description, String valor) {
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => LayoutScreen(
        imagePath: imagePath,
        title: title,
        subTitle: subTitle,
        description: description,
        valor: valor,
      ),
    ),
  );
}

class CarrosselItem extends StatelessWidget {
  final String imagePath;
  final String text;
  final VoidCallback onTap;

  const CarrosselItem({
    super.key,
    required this.imagePath,
    required this.text,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Stack(
        children: [
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 10.0),
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage(imagePath),
                fit: BoxFit.cover,
              ),
              borderRadius: BorderRadius.circular(8.0),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 10,
            right: 10,
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 15),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.2),
                borderRadius: const BorderRadius.only(
                  bottomLeft: Radius.circular(8.0),
                  bottomRight: Radius.circular(8.0),
                ),
              ),
              child: Text(
                text,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
