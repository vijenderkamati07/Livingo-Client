const getMainPhoto = (photo) => (Array.isArray(photo) ? photo[0] : photo);

export default function HomeCard({ home, index }) {
  const img = getMainPhoto(home.photo);

  return (
    <div className="card-depth relative mt-[25px] mb-[10px] group flex-shrink-0 w-[250px] sm:w-[270px] lg:w-[290px]">
      <div className="card-wrapper rounded-2xl">
        <a href={`/home/${home._id}`}>
          <div className="card-img">
            <img
              src={`https://livingo-backend.onrender.com/uploads/${img}`}
              alt={home.houseName}
              className="object-cover"
            />
            <div className="card-gradient" />
            <span className="card-category">{home.category}</span>
          </div>

          <div className="card-content">
            <h3 className="card-title">{home.houseName}</h3>
            <p className="card-price">
              ₹{home.price} <span>/ night</span>
            </p>
            <p className="card-location">
              {home.location}, {home.state}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
