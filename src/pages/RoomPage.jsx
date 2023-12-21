const RoomPage = ({ setIsAuth, setRoom }) => {
  const logout = () => {
    //State'i günceller
    setIsAuth(false);
    //lokalden kaldırma
    localStorage.removeItem("TOKEN");
  };

  //Odaya gir
  const handleSubmit = (e) => {
    e.preventDefault();

    const roomName = e.target[0].value;

    //state'i güncelleme
    setRoom(roomName);
  };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Oda seçiniz</p>
      <input type="text" />
      <button type="submit">Odaya Gir</button>
      <button type="button" onClick={logout}>
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
