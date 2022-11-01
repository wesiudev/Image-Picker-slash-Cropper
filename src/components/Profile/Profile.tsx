import { useState } from "react";
import defaultImg from "../../images/ssmain.png";
import ImageModal from "./Elements/ImageModal";

function Profile() {
  const [allowComments, setAllowComments] = useState<boolean>(
    false
  );
  const [allowReservations, setAllowReservations] = useState<boolean>(
    false
  );
  return (
    <>
      <div className="head">
        <div className="head__modalWrapper">
          <ImageModal
            defaultImage={defaultImg}
          />
        </div>
        <div className="head__userInfo">
          <h1>Paweł</h1>
          <h2 className="head__userInfo__phoneNumber">721417154</h2>
          <h2 className="head__userInfo__email">wesselpawel@wp.pl</h2>
        </div>
      </div>
      <div className="interactions">
        <h1>Rezerwacje online</h1>
        <h3>
          Czy chcesz, aby klienci mogli rezerwować Twoje usługi drogą mailową?
        </h3>
        <button
          onClick={() => setAllowReservations(!allowReservations)}
          className="smallAction"
        >
          <div className={allowReservations ? "activated" : ""}></div>
        </button>
        <h1>Komentarze i oceny</h1>
        <h3>
          Czy chcesz, aby komentarze i oceny klientów były widoczne pod Twoim
          ogłoszeniem?
        </h3>
        <button
          onClick={() => setAllowComments(!allowComments)}
          className="smallAction"
        >
          <div className={allowComments ? "activated" : ""}></div>
        </button>
      </div>
    </>
  );
}

export default Profile;
