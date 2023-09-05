const Footer = () => {
  const footerData = [
    "Privacy Policy",
    "Terms and Conditions",
    "Contact Support",
  ];
  return (
    <div className="bg-[#000000da]  text-white py-5 w-full px-[7rem] sm:flex hidden justify-between">
      <div>All rights reserved &copy; 2023 APZOR</div>
      <div className="flex gap-5 justify-center">
        {footerData.map((data, index) => (
          <div key={index}>{data}</div>
        ))}
      </div>
    </div>
  );
};
export default Footer;
