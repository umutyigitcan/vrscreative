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

## Proje yapısı

- `dist/`: doğrudan yayınlanabilir web sitesi
- `dist/assets/`: logo ve hizmet tanıtım görselleri
- `tools/`: sayfa üretim aracı

## Yayın

Geçici canlı adres: [vrs.187.77.86.105.sslip.io](https://vrs.187.77.86.105.sslip.io/)
