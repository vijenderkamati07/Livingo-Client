// src/Components/form/PhotoUploader.jsx
export default function PhotoUploader({
  label,
  description,
  imagePreview,
  onFileSelect,
}) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    onFileSelect?.(file || null);
  };

  const handleRemove = () => {
    onFileSelect?.(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <p className="text-[11px] text-[#9D99B0]">{description}</p>
          )}
        </div>
      </div>

      <label className="block cursor-pointer">
        <div className="relative border border-dashed border-[#3B3550] rounded-2xl bg-gradient-to-br from-[#151320] via-[#12101C] to-[#0E0D13] p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center hover:border-[#8C5FF6] hover:shadow-[0_0_25px_rgba(140,95,246,0.4)] transition-all duration-300">
          <div className="w-20 h-20 rounded-2xl bg-[#18171F] flex items-center justify-center text-3xl shadow-[0_0_16px_rgba(0,0,0,0.7)]">
            📸
          </div>

          <div className="flex-1 text-left">
            <p className="text-sm font-semibold mb-1">
              Click to upload or drag & drop
            </p>
            <p className="text-[11px] text-[#9D99B0] mb-1">
              JPG, PNG up to 10MB. For best results, use landscape images.
            </p>
            <span className="inline-flex mt-1 px-3 py-1 rounded-full text-[11px] font-medium bg-[#1E1A2B] border border-[#8C5FF640] text-[#C9C5D4]">
              Tip: Avoid dark, low-resolution photos.
            </span>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      </label>

      {imagePreview && (
        <div className="relative mt-2">
          <img
            src={imagePreview}
            alt="Preview"
            className="rounded-2xl w-full h-48 sm:h-56 object-cover border border-[#2D2A37] shadow-[0_14px_30px_rgba(0,0,0,0.8)]"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded-full bg-[#0E0D13]/85 border border-[#F97373] text-[#FCA5A5] hover:bg-[#3B1B23] hover:border-[#F97373] hover:text-white transition-all"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
