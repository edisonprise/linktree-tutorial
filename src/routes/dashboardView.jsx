import AuthProvider from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { getLinks, insertNewLink } from "../firebase/firebase";
import Link from "../components/link";

const DashboardView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
    setState(3);
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      >
        Loading...
      </AuthProvider>
    );
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    addLink();
  }

  function addLink() {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  }

  function handleOnChange(e) {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    }

    if (e.target.name === "url") {
      setUrl(value);
    }
  }

  function handleDeleteLink() {}
  function handleUpdateLink() {}

  return (
    <DashboardWrapper>
      <div>
        <h1>Dashboard</h1>
        <form action="" onSubmit={handleOnSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={handleOnChange} />

          <label htmlFor="url">Url</label>
          <input type="text" name="url" onChange={handleOnChange} />

          <input type="submit" value="Create new link" />
        </form>
        <div>
          {links.map((link) => (
            <Link
              key={link.docId}
              url={link.url}
              title={link.title}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            />
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardView;
