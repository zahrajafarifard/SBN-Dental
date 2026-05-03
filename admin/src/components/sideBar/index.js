import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Logo from "../../assets/icons/logo.svg";
import { io } from "socket.io-client";
import FormIcon from "../../assets/icons/form.svg";
import SocialIcon from "../../assets/icons/social.svg";
import ProductIcon from "../../assets/icons/product.svg";
import CategoryIcon from "../../assets/icons/category.svg";

import styles from "../../style.module.css";

function Sidebar() {
  const location = useLocation();
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_URL}`, {
      // transports: ["websocket", "polling"],
      transports: ["polling"],
    });

    socket.on("readMessages", () => {
      setUnreadMessages(0);
    });
  }, []);

  useEffect(() => {
    const _contact = async () => {
      let _response, _data;

      _response = await fetch(
        `${process.env.REACT_APP_URL}/api/unreadMessages`,
        {
          // method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      switch (_response.status) {
        case 200:
          _data = await _response.json();
          setUnreadMessages(_data?.data);

          break;

        default:
          break;
      }
    };
    _contact();
  }, []);

  const readMessageshandler = async () => {
    let _response, _data;

    _response = await fetch(`${process.env.REACT_APP_URL}/api/readMessages`, {
      // method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    switch (_response.status) {
      case 200:
        _data = await _response.json();

        setUnreadMessages(0);

        break;

      default:
        break;
    }
  };

  return (
    <div className="  shadow-[0_0_4px_0_rgba(0,0,0,0.3)] rounded-[32px] m-4 sticky top-[90px] h-[90vh] ">
      <div className="px-4 py-6  flex flex-row ">
        <img src={Logo} className="w-28  my-auto" />
      </div>

      <div
        className={`${styles.backGroundLine} text-[#CFE8F6] bg-[#CFE8F6] w-2/3 h-px mx-auto mb-10 `}
      />
      <ul className="text-base text-[#6D6F72] ">
        <NavLink to="/articles">
          <div
            className={`flex flex-row  px-4 py-4 my-2 ${
              (location.pathname === "/articles" ||
                location.pathname === "/new-article") &&
              "bg-[#F7FAFD]"
            }`}
          >
            <img src={FormIcon} className="w-6 h-6 my-auto" />
            <li className="px-6"> مقالات </li>
          </div>
        </NavLink>

        <NavLink to="/products">
          <div
            className={`flex flex-row  px-4 py-4 my-2 ${
              (location.pathname === "/products" ||
                location.pathname === "/new-product") &&
              "bg-[#F7FAFD]"
            }`}
          >
            <img src={ProductIcon} className="w-6 h-6 my-auto" />
            <li className="px-6"> محصولات </li>
          </div>
        </NavLink>

        <NavLink to="/contact-form">
          <div
            onClick={readMessageshandler}
            className={`flex flex-row justify-between px-4 py-4 my-2 ${
              location.pathname === "/contact-form" && "bg-[#F7FAFD]"
            }`}
          >
            <div className="flex flex-row">
              <img src={FormIcon} className="w-6 h-6 my-auto" />
              <li className="px-6"> فرم تماس </li>
            </div>
            {unreadMessages !== 0 && (
              <div className="bg-[#EE5248] rounded-full text-white w-6 h-6 flex justify-center items-center">
                {unreadMessages}
              </div>
            )}
          </div>
        </NavLink>
        <NavLink to="/social-media">
          <div
            className={`flex flex-row  px-4 py-4 my-2 ${
              location.pathname === "/social-media" && "bg-[#F7FAFD]"
            }`}
          >
            <img src={SocialIcon} className="w-6 h-6 my-auto" />
            <li className="px-6"> شبکه های اجتماعی </li>
          </div>
        </NavLink>
        <NavLink to="/categories">
          <div
            className={`flex flex-row  px-4 py-4 my-2 ${
              location.pathname === "/categories" && "bg-[#F7FAFD]"
            }`}
          >
            <img src={CategoryIcon} className="w-6 h-6 my-auto" />
            <li className="px-6"> دسته بندی </li>
          </div>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
