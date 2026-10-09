### Cara Sambung Akun Git

1. **Unset akun lama:**
```bash
git config --global --unset user.email
git config --global --unset user.name
```
2. **Set akun baru:**
```bash
git config --global user.email "252011216@asia.ac.id"
git config --global user.name "252011216"
```
3. **Hapus kredensial lama di Windows Credential Manager:**
* Buka **Credential Manager**.
* Pilih **Windows Credentials**.
* Cari `git:https://github.com`.
* Pilih akun yang ingin dihapus, lalu klik **Remove**.

---

### Cara Clone Repository

1. Buka repository di **GitHub**.
2. Salin (copy) link dari tombol **Code**.
3. Buka terminal di **VS Code**, lalu jalankan:
```bash
git clone '<link-repository>'
```

---
### Cara Menyimpan Perubahan (Push)

1. Buka terminal di **VS Code**.
2. Jalankan perintah berikut secara berurutan:
```bash
git add .
git commit -m "baru 2"
git push
```
3. Saat pop-up otentikasi muncul, pilih opsi login yang diinginkan (menggunakan **Browser** atau **Token**).
