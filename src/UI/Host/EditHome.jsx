// src/Pages/Host/AddHome.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addHomeService,
  getSingleHomeService,
  updateHomeService,
} from "../../Services/hostServices.js";

import Stepper from "../../Components/FormComponents/Stepper.jsx";
import PhotoUploader from "../../Components/FormComponents/PhotoUploader.jsx";
import CategoryGridSelector from "../../Components/FormComponents/CategoryGridSelector.jsx";

const CATEGORY_OPTIONS = [
  { id: "Resort", label: "Resort", emoji: "🏝️", tag: "Pool & views" },
  { id: "Apartment", label: "Apartment", emoji: "🏙️", tag: "City stay" },
  { id: "Villas", label: "Villa", emoji: "🏡", tag: "Private luxury" },
  { id: "Farmhouses", label: "Farmhouse", emoji: "🌾", tag: "Countryside" },
  { id: "Hostels", label: "Hostel", emoji: "🛏️", tag: "Budget beds" },
  { id: "Rooms", label: "Room", emoji: "🚪", tag: "Single room" },
];

const STEPS = ["Basics", "Photos", "Details & Pricing"];

export default function AddHome() {
  const { homeId } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(homeId);

  const [formData, setFormData] = useState({
    houseName: "",
    price: "",
    location: "",
    state: "",
    category: "",
    description: "",
  });

  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(editing);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // refs
  const basicsRef = useRef(null);
  const photosRef = useRef(null);
  const detailsRef = useRef(null);
  const sectionRefs = [basicsRef, photosRef, detailsRef];

  // preload on editing
  useEffect(() => {
    if (!editing) return setLoading(false);
    (async () => {
      try {
        const home = await getSingleHomeService(homeId);
        const h = home?.home || home;
        setFormData({
          houseName: h.houseName || "",
          price: h.price || "",
          location: h.location || "",
          state: h.state || "",
          category: h.category || "",
          description: h.description || "",
        });
        if (h.photo)
          setImagePreview(`https://livingo-backend.onrender.com/uploads/${h.photo}`);
      } catch {
        toast.error("Unable to load home");
      } finally {
        setLoading(false);
      }
    })();
  }, [editing, homeId]);

  // 🔥 dynamic progress
  const completionFields = [
    formData.houseName,
    formData.location,
    formData.state,
    formData.price,
    formData.description,
    formData.category,
    imagePreview,
  ];
  const filled = completionFields.filter((v) => v && v !== "").length;
  const progressPercent = Math.floor((filled / completionFields.length) * 100);

  const handleStepClick = (index) => {
    setCurrentStep(index);
    sectionRefs[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    if (photo) data.append("photo", photo);

    try {
      if (editing) {
        await updateHomeService(homeId, data);
        toast.success("Home updated!");
      } else {
        await addHomeService(data);
        toast.success("Home added!");
      }
      navigate("/host/host-homes");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#0E0D13] text-[#E5E3F3] min-h-screen flex flex-col">
      {/* HERO */}
      <section className="w-full border-b border-[#2D2A37] bg-gradient-to-b from-[#151320] via-[#0E0D13] to-[#0E0D13]">
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#9D99B0] mb-2">
              {editing ? "Edit listing" : "New listing"}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-white">
              {editing ? (
                <>
                  Update your{" "}
                  <span className="bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] bg-clip-text text-transparent">
                    LivinGo
                  </span>{" "}
                  home
                </>
              ) : (
                <>
                  Add your home to{" "}
                  <span className="bg-gradient-to-r from-[#8C5FF6] to-[#F43F63] bg-clip-text text-transparent">
                    LivinGo
                  </span>
                </>
              )}
            </h1>
            <p className="text-sm md:text-base text-[#C9C5D4] max-w-xl">
              Fill out the essentials, upload a few great photos, and fine-tune
              your pricing.
            </p>
          </div>

          {/* progress bar */}
          <div className="hidden md:flex flex-col items-end gap-2 text-right">
            <span className="text-xs text-[#9D99B0]">
              Listing quality guide
            </span>
            <div className="flex items-center gap-2">
              <div className="w-36 h-2 rounded-full bg-[#18171F] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8C5FF6] via-[#F97373] to-[#FBBF24]"
                  style={{
                    width: `${progressPercent}%`,
                    transition: "width 0.35s ease",
                  }}
                />
              </div>
              <span className="text-xs text-[#E5E3F3]">{progressPercent}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-16">
          {/* STEPPER */}
          <div className="mb-7 sticky top-[70px] z-20 bg-[#0E0D13]/92 backdrop-blur-sm border border-[#2D2A37] rounded-2xl px-4 sm:px-6 py-3">
            <Stepper
              steps={STEPS}
              currentStep={currentStep}
              onStepClick={handleStepClick}
              progress={progressPercent} // 👈 IMPORTANT
            />
          </div>

          {/* FORM + SIDEBAR */}
          {!loading ? (
            <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(250px,0.75fr)] gap-8 items-start">
              {/* ⭐ FORM */}
              <form
                onSubmit={handleSubmit}
                className="add-home-card w-full max-w-[780px] mx-auto lg:mx-0 p-6 sm:p-8 rounded-3xl space-y-7"
                encType="multipart/form-data"
              >
                {/* BASICS */}
                <section ref={basicsRef} className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    Basics
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    <div className="md:col-span-2">
                      <label className="label">Home Name</label>
                      <input
                        className="input"
                        value={formData.houseName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            houseName: e.target.value,
                          })
                        }
                        placeholder="Eg. Neon Sky Villa with Infinity Pool"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Location (City)</label>
                      <input
                        className="input"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Eg. Jaipur / Goa / Manali"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Your State</label>
                      <input
                        className="input"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        placeholder="Eg. Himachal / Rajsthan / Kerla"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Price per Night (₹)</label>
                      <input
                        type="number"
                        className="input"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="Eg. 4500"
                        required
                      />
                    </div>
                  </div>
                </section>

                {/* PHOTOS */}
                <section ref={photosRef} className="space-y-4 pt-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    Photos
                  </h2>
                  <PhotoUploader
                    label="Cover image"
                    imagePreview={imagePreview}
                    onFileSelect={(file) => {
                      setPhoto(file || null);
                      setImagePreview(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                </section>

                {/* DETAILS */}
                <section ref={detailsRef} className="space-y-5 pt-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    Details & Category
                  </h2>
                  <CategoryGridSelector
                    options={CATEGORY_OPTIONS}
                    value={formData.category}
                    onChange={(v) => setFormData({ ...formData, category: v })}
                  />
                  <label className="label">Description</label>
                  <textarea
                    className="input min-h-[120px]"
                    rows="5"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </section>

                {/* SUBMIT */}
                <div className="flex justify-end pt-4">
                  <button disabled={submitting} className="submit-btn px-7">
                    {submitting
                      ? "Saving..."
                      : editing
                      ? "Save changes"
                      : "Publish listing"}
                  </button>
                </div>
              </form>

              {/* SIDEBAR */}
              <aside className="hidden md:flex flex-col gap-4">
                <div className="bg-[#18171F] border border-[#2D2A37] rounded-3xl p-5">
                  <h3 className="text-sm font-semibold mb-2">
                    Quick tips for premium listings
                  </h3>
                  <ul className="text-xs space-y-1 text-[#C9C5D4]">
                    <li>• Use a short, specific title.</li>
                    <li>• Mention Wi-Fi / AC / parking.</li>
                    <li>• Keep main photo bright.</li>
                    <li>• Set competitive pricing until reviews come.</li>
                  </ul>
                </div>
              </aside>
            </div>
          ) : (
            <p className="text-center text-sm py-20 text-[#C9C5D4]">
              Loading listing…
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
