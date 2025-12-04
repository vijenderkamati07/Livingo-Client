import React from "react";

function Footer() {
  return (
    <footer className="bg-[#0B0A10] border-t border-[#1A1822]  pt-14 pb-8 text-[#C9C5D4]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-3">
          <a href="/" className="text-3xl font-extrabold tracking-tight">
            <span className="text-white">Livin</span>
            <span className="text-[#8C5FF6]">Go</span>
          </a>
          <p className="text-sm leading-relaxed text-[#9C97AA] max-w-xs">
            Modern stays, unique homes, and premium travel experiences — all in
            one place.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="social-icon hover:text-[#8C5FF6] transition">
              <i className="ri-instagram-line text-xl"></i>
            </a>
            <a href="#" className="social-icon hover:text-[#8C5FF6] transition">
              <i className="ri-twitter-x-line text-xl"></i>
            </a>
            <a href="#" className="social-icon hover:text-[#8C5FF6] transition">
              <i className="ri-youtube-line text-xl"></i>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="footer-link">
                Help Centre
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Cancellation Options
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Safety Information
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-white">Community</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="footer-link">
                Travellers
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Gift Cards
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Refer & Earn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-white">Hosting</h3>
          <ul className="space-y-2">
            <li>
              <a href="/host/add-home" className="footer-link">
                Become a Host
              </a>
            </li>
            <li>
              <a href="/host/host-home-list" className="footer-link">
                Host Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Hosting Resources
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-[#1A1822] text-center text-xs text-[#797484]">
        © 2025 LivinGo — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
