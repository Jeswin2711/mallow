import React, { useEffect, useMemo } from "react";
import { Button, Pagination, Popconfirm, Skeleton, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AxiosError } from "axios";
import type { UserDataType } from "@/types/types";
import userApis from "@/apis/userApis";
import useNotification from "@/hooks/useNotification";
import type { AppDispatch, RootState } from "@/redux/store";
import { deleteUser, getUsers, updatePage } from "@/redux/slice/userSlice";
import { wordFormatter } from "@/utils/helpers";

//spread

let a = [1,2,3,4]
let b = [...a]


//rest
function sample(...args : any){
  console.log(args,"<<args"); // 1,2,3,4,5
}

sample(1,2,3,4,5,10,202,20)

const UserListView = ({ view, search, setSelectedUserData, setShowModal }: { view: string, search: string, setSelectedUserData : React.Dispatch<React.SetStateAction<UserDataType>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
  document.title = 'Users List'
  const { users: userList, loading, error } = useSelector((state: RootState) => state?.users)
  const { notifySuccess, notifyError } = useNotification()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getUsers(userList.page))
  }, [dispatch, userList.page])


  function handleEdit(data: UserDataType): void {
    setSelectedUserData(data);
    setShowModal(true)
  }

  async function handleDelete(id: string): Promise<void> {
    try {
      const response = await userApis.deleteUser(`/users/${id}`)
      dispatch(deleteUser(id))
      notifySuccess('User Delete Success')
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      notifyError(err?.response?.data.error || 'Something Went Wrong')
    }
  }

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => {
        return <img src={avatar} className="profile-img" />;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <a className="email">{email}</a>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Action",
      render: (row: UserDataType) => {
        return (
          <div className="action-btns">
            <Button className="edit-btn" onClick={() => handleEdit(row)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete the user"
              description="Please confirm that you want to delete this user?"
              onConfirm={() => handleDelete(row.id as string)}
              onCancel={() => { }}
              okText="Yes"
              cancelText="No"
            >
              <Button className="delete-btn">Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];


  let filteredData = useMemo(() => {
    if (search.length) {
      return userList?.data?.filter((obj: UserDataType) =>
        obj.first_name.toLowerCase().includes(search.toLowerCase()) || obj.last_name.toLowerCase().includes(search.toLowerCase())) || []
    }
    return userList?.data;
  }, [search, userList])

  if (error) return <p>Something Went Wrong</p>

  return (
    <div className="user-list-view-page">
      {view === "table" ? (
        <Table
          dataSource={filteredData?.map((user: UserDataType) => ({
            key: user?.id,
            id: user?.id,
            first_name: wordFormatter(user?.first_name),
            last_name: wordFormatter(user?.last_name),
            email: user?.email?.toLowerCase(),
            avatar: user?.avatar ?? 'https://avatars.githubusercontent.com/u/9113740?v=4',
          }))}
          key={`table`}
          columns={columns}
          pagination={false}
          loading={loading}
        />
      ) : (
        <div className="card-view-container">
          {loading ? (
            Array.from({
              length: 6,
            }).map((_, index) => (
              <div className="card-view" key={`skeleton_card_${index}`}>
                <Skeleton.Avatar className="avatar-skeleton" />
                <Skeleton.Node className="node-skeleton" />
              </div>
            ))
          ) : (
            <>
              {filteredData?.map((user: UserDataType) => {
                return (
                  <div className="card-view" key={user?.id}>
                    <div className="user-profile">
                      <img src={user.avatar} height={40} width={40} />
                    </div>
                    <div className="user-details">
                      <p>
                        {wordFormatter(user?.first_name)} {wordFormatter(user?.last_name)}
                      </p>
                      <p>{user?.email}</p>
                    </div>
                    <div className="user-actions">
                      <Button
                        className="edit-btn rounded"
                        onClick={() => handleEdit(user)}
                      >
                        <i className="fi fi-rr-pencil flex items-center"></i>
                      </Button>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(user.id as string)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button className="delete-btn rounded">
                          <i className="fi fi-rr-trash flex items-center"></i>
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
      <Pagination
        align="end"
        defaultCurrent={1}
        total={userList?.total}
        onChange={(page) => {
          dispatch(updatePage(page))
        }}
        className="view-page-pagination"
      />
    </div>
  );
};

export default UserListView;
