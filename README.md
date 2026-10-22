# VRS Creative

VRS Creative için hazırlanmış çok sayfalı, statik kurumsal web sitesi. Proje; tabela sistemleri, dijital baskı, araç ve cephe giydirme hizmetlerini tanıtır.

## Yerelde çalıştırma

Ek bir derleme adımı gerekmez. Proje kökünde şu komutu çalıştırın:

```bash
python3 -m http.server 49322 --directory dist
```

Ardından `http://127.0.0.1:49322/` adresini açın.

## İçerik üretimi

İç sayfaları yeniden oluşturmak için:

```bash
node tools/build_pages.mjs
```

Örnek PDF kataloğu yeniden oluşturmak için Python ve ReportLab gerekir:

```bash
python3 tools/build_catalog.py
```

Üretilen katalog `output/pdf/` altında tutulur; web sitesinde kullanılan kopyası `dist/assets/` içindedir.

## Proje yapısı

- `dist/`: doğrudan yayınlanabilir web sitesi
- `dist/assets/`: logo, hizmet görselleri ve örnek katalog
- `tools/`: sayfa ve katalog üretim araçları
- `output/pdf/`: katalog çıktısı

## Yayın

Canlı önizleme: [vrs.187.77.86.105.sslip.io](https://vrs.187.77.86.105.sslip.io/)

> Sertifika, makine parkuru ve katalog içerikleri prototip amaçlı örnek içeriklerdir; gerçek belge veya taahhüt niteliği taşımaz.
