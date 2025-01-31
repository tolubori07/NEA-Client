import { lazy, useState } from "react";

const Header = lazy(() => import("../../components/DonorHeader"));
const Input = lazy(() => import("../../components/Input"));
const Button = lazy(() => import("../../components/Button"));
const Select = lazy(() => import("../../components/Select2"));

const Dsignup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPost] = useState("");
  const [blood, setBlood] = useState("");
  const [genotype, setGenotype] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const genotypes = ["AA", "AS", "SS"];
  return (
    <div>
      <Header />
      <h3 className="text-text font-display text-xl text-center px-2 mb-12">
        Become a vital part of our lifesaving community, uniting hearts and
        sharing life through voluntary blood donations and medical outreach.
      </h3>
      <div className="w-full flex justify-center">
        <form action="" className="flex flex-col gap-12 w-full">
          <div className="flex justify-center w-full px-12">
            <Input placeholder={"First Name"} className={"w-full"} />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input placeholder={"Last Name"} className={"w-full"} />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              type={"date"}
              placeholder={"Date of Birth"}
              className={"w-full"}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input placeholder={"Title"} className={"w-full"} />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input placeholder={"Email"} className={"w-full"} />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input placeholder={"Phone number"} className={"w-full"} />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input placeholder={"City/Town"} className={"w-full"} />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input placeholder={"Post Code"} className={"w-full"} />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input placeholder={"Blood Group"} className={"w-full"} />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input placeholder={"Genotype"} className={"w-full"} />
            <Select placeholder={"genotype"} items={genotypes} />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              type="password"
              placeholder={"Password"}
              className={"w-full"}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              type="password"
              placeholder={"Confirm Password"}
              className={"w-full"}
            />
          </div>
          <div className="flex justify-center w-2/5">
            <Button className={"text-center"}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dsignup;
