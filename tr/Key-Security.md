---
title: Anahtar Güvenliği
layout: page
lang: tr
lang-ref: Key-Security
navnum: 4.1
parent: Atomic NFT’lere sahip olmak ve onları saklamak
---

# Anahtar Güvenliği

{: .fs-9 }

<br>
Blok zinciri sistemlerinin yaygın olarak dikkat çekmesinin başlıca nedenlerinden biri, merkezi bir varlığa güvenmeden güvenli ağlar sağlama yetenekleri olmuştur. Buna rağmen, blok zinciri yaklaşımının bazı sınırlamaları vardır ve bunları anlamak, yeni ürünleri ve çözümleri uygun şekilde dağıtmanın başlıca anahtarıdır.

## ANAHTARLARINIZI YÖNETMEK

### BİREYSEL HESAP ÖDÜLÜ

<br>
GEÇMİŞTE 8 HANELİ BİR ŞİFRENİN KIRILMASI NEREDEYSE İMKANSIZDI, AMA 2020'DE BU SADECE MÜMKÜN DEĞİL, AYNI ZAMANDA KOLAYDIR.

Çevrimiçi ortamda güvende kalmak, güçlü bir gizli anahtardan daha fazlasıdır. Yasadışı torrentlerden ve diğer doğrulanmamış indirmelerden kaçınmak, başlangıç olarak yeterlidir. Ancak, kurumsal e-yönetişim söz konusu olduğunda işler daha da karmaşık hale gelir. Yazılım incelemesi, dikkatli denetimler ve değişikliklerin yönetimi, herhangi bir merkeziyetsiz proje için yüksek öncelik olmalıdır. Özel anahtarların herkesin erişebileceği bir yerde saklanması, suçlular için bir fırsat anlamına gelmektedir.

Ayrıca, düşük kaliteli bir parola, modern bir ekran kartına sahip herhangi bir bilgisayarın parolanızı kırmasını mümkün kılabilir. Bazı şeyleri ucuza yapmaya çalışmak işleri kötüye götürebilir, örneğin ucuz bir bulut sağlayıcısı. Son olarak, hesap oluşturma sırasında entropi/rastgelelik kaynağınızın yeterli olmasını sağlamak iyi bir şey gibi görünebilir, ancak son kullanıcıların kontrol sahibi olduğu bir şeyi güvenli sanmak, aslında durumun temel zayıflıklarından bir tanesidir.

Gerçek cüzdanların saldırıya uğramasının yanı sıra, bir geliştiricinin Github hesabının ele geçirilme riski her zaman vardır. Bu durumda kötü bir aktör blok zinciri ağı için istemci yazılımına kötü amaçlı kod ekleyebilir. Geçmişte, kötü niyetli aktörler, Bitcoin istemcisinde kullanılan kriptografik kitaplıklar gibi diğer yazılımlarda kullanılan modüller için geliştirme topluluklarına katılacak kadar ileri gittiler ve bu kaynaklara kötü amaçlı kod göndererek güvenlik boşlukları oluşturmaya çalıştılar.

- Çekirdek blok zinciri kodu çoğu zaman arızalanmasa da, cüzdan ve istemci yazılımı birçok bilgisayar korsanı için kolay bir hedeftir. İndirdiğiniz cüzdan yazılımının yayıncının karma değeriyle eşleştiğini her zaman doğrulamak önemlidir. Çoğu iOS ve Google Play uygulama mağazası bunu otomatik olarak yapar, ancak masaüstü uygulamaları konusunda özellikle dikkatli olmalıyız.
  {: .text-purple-000}

### KRİPTO PARA CÜZDANLARI

<br>
- YAPILAN İŞ İÇİN DOĞRU ARACA SAHİP OLMAK ÖNEMLİDİR.

Kripto para birimlerini yönetmek için kullandığımız yazılıma “cüzdan” denmesine rağmen, cüzdanın kendisinde gerçek bir değer tutulmaz. Bu aslında, özel anahtarlarınız ve blok zinciri ağlarınızla etkileşime geçmek için bir yönetim arayüzüdür. Modern kripto para cüzdanları daha çok, herhangi bir gerçek varlığı doğrudan tutmayan, ancak bunları başka bir kişiye imzalayabilen bir çek defteri gibidir. Bakiyeler blok zincirinin kendisi tarafından takip edildiğinden, kripto para cüzdanları esas olarak kriptografik mesajları imzalama ve bunları ağdaki eş düğümlere yayınlama sürecini otomatikleştirir.
