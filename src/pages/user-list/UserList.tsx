import { useState } from "react";
import "./user-list.scss";
import { Button, Input, Radio } from "antd";
import UserAction from "@/components/modals/UserAction";
import withAuthProtection from "@/hoc/withAuthenticate";
import UserListView from "./views/UserListView";

document.title = 'Users List'

const UserList = () => {
  const [view, setView] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")

  function handleViewChange(view: string): void {
    setView(view);
  }

  return (
    <section className="user-list-page">
      <div className="user-list-container">
        <div className="title-bar">
          <div>
            <h1>Users</h1>
            <div className="actions">
              <Input.Search
                placeholder="input search text"
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                onSearch={(value) => {
                  setSearchTerm(value);
                }}
                maxLength={24}
                style={{ width: 200 }}
              />
              <Button
                className="create-user-btn"
                onClick={() => setShowModal(true)}
              >
                Create User
              </Button>
            </div>
          </div>
          <Radio.Group
            defaultValue={"table"}
            size={"middle"}
            value={view}
            onChange={({ target: { value } }) => {
              handleViewChange(value);
            }}
          >
            <Radio.Button value="table">
              <i className="fi fi-tr-table"></i>
              Table
            </Radio.Button>
            <Radio.Button value="list">
              <i className="fi fi-rr-list"></i>
              List
            </Radio.Button>
          </Radio.Group>
        </div>
        <UserListView view={view} search={searchTerm}/>
      </div>
      {showModal && (
        <UserAction
          userData={{
            first_name: "",
            last_name: "",
            email: "",
            avatar: "",
          }}
          setShowModal={setShowModal}
        />
      )}
    </section>
  );
};

export default withAuthProtection(UserList);
