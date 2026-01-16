import 'package:flutter/material.dart';
import 'dart:math';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'おみくじアプリ',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const OmikujiPage(),
    );
  }
}

class OmikujiPage extends StatefulWidget {
  const OmikujiPage({super.key});

  @override
  State<OmikujiPage> createState() => _OmikujiPageState();
}

class _OmikujiPageState extends State<OmikujiPage> {
  String? _result;
  bool _isLoading = false;
  List<String> _results = [];
  bool _showManagement = false;
  final TextEditingController _nameController = TextEditingController();
  final Random _random = Random();

  @override
  void initState() {
    super.initState();
    _initializeResults();
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  void _initializeResults() {
    // デフォルトのおみくじ結果
    setState(() {
      _results = [
        '大凶',
        '凶',
        '末吉',
        '小吉',
        '中吉',
        '吉',
        '大吉',
      ];
    });
  }

  void _drawOmikuji() {
    if (_results.isEmpty) {
      _showError('おみくじ結果がありません');
      return;
    }

    setState(() {
      _isLoading = true;
      _result = null;
    });

    // 少し遅延を入れて演出
    Future.delayed(const Duration(milliseconds: 500), () {
      setState(() {
        final index = _random.nextInt(_results.length);
        _result = _results[index];
        _isLoading = false;
      });
    });
  }

  void _addResult() {
    final name = _nameController.text.trim();
    if (name.isEmpty) {
      _showError('結果名を入力してください');
      return;
    }

    if (_results.contains(name)) {
      _showError('この結果は既に存在します');
      return;
    }

    setState(() {
      _results.add(name);
      _nameController.clear();
    });
  }

  void _deleteResult(String name) {
    showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('確認'),
        content: Text('「$name」を削除しますか？'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('キャンセル'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('削除'),
          ),
        ],
      ),
    ).then((confirmed) {
      if (confirmed == true) {
        setState(() {
          _results.remove(name);
        });
      }
    });
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('おみくじ'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: _isLoading ? null : _drawOmikuji,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              child: Text(_isLoading ? '引いています...' : 'おみくじを引く'),
            ),
            const SizedBox(height: 40),
            if (_result != null)
              Container(
                padding: const EdgeInsets.all(30),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _result!,
                  style: const TextStyle(
                    fontSize: 48,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
              ),
            const SizedBox(height: 60),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _showManagement = !_showManagement;
                });
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                foregroundColor: Colors.white,
              ),
              child: Text(_showManagement ? '管理画面を閉じる' : '結果を管理する'),
            ),
            if (_showManagement) ...[
              const SizedBox(height: 30),
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.grey[50],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      '結果の管理',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20),
                    Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _nameController,
                            decoration: const InputDecoration(
                              labelText: '結果名（例: 超吉）',
                              border: OutlineInputBorder(),
                            ),
                          ),
                        ),
                        const SizedBox(width: 10),
                        ElevatedButton(
                          onPressed: _addResult,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green,
                            foregroundColor: Colors.white,
                          ),
                          child: const Text('追加'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 30),
                    const Text(
                      '現在の結果一覧',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    ..._results.map((name) => Card(
                      margin: const EdgeInsets.only(bottom: 10),
                      child: ListTile(
                        title: Text(
                          name,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        trailing: IconButton(
                          icon: const Icon(Icons.delete, color: Colors.red),
                          onPressed: () => _deleteResult(name),
                        ),
                      ),
                    )),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
