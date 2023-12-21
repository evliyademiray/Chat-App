import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);

  //Koleksiyonun referansını alma
  const messagesCol = collection(db, "messages");

  //Filtreleme ayarları oluşturma
  const queryOptions = query(
    messagesCol,
    where("room", "==", room),
    orderBy("createdAt", "asc")
  );

  //Mesajı veritabanına ekle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    //veritabanına yeni döküman ekler
    //1. Ekleme yapacağımıx kolleksiyonun referansı
    //2. Oluşturaca
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    
    //Formu sıfırlar
    e.target.reset();
  };

  //Verilere abone ol
  useEffect(() => {
    //anlık olarak kolleksiyondaki değişimi izler
    //kolleksiyon her değiştiğinde verdiğimiz fonksiyonu çalıştırır.
    const unsub = onSnapshot(queryOptions, (snapshot) => {
      //Geçici olarak mesajları tuttuğumuz dizi
      const tempMsg = [];
      //docs tamamını döndük ve verilerini erişip geçici bir diziye aktardık
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));

      //geçici dizideki verileri alıp state'e aktardık
      setMessages(tempMsg);
    });

    //kullanıcı bileşenden ayrılınca aboneliği sonlandır
    return () => unsub();
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda Seç</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="Mesaj gir..." />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
