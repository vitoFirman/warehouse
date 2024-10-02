import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin,  BsWhatsapp } from "react-icons/bs";


const FooterComponent = () => {
  return (
    <Footer container className="mt-16 w-full rounded-none">
      <div className="w-full text-center">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Flowbite™" year={2022}  className="sm:ml-64"/>
          <div className="mt-4 flex space-x-6 sm:mt-0 justify-center">
            <Footer.Icon href="https://www.facebook.com/vito.firman/" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsWhatsapp} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComponent