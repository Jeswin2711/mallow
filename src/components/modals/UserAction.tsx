import { Form, Input, Modal } from "antd";
import { useState } from "react";
import "./modal.scss";
import { z } from "zod";
import { ZodError } from "zod/v4";
import { useDispatch } from "react-redux";
import type { ModalInput, UserDataType } from "@/types/types";
import userApis from "@/apis/userApis";
import { addUser, updateUser } from "@/redux/slice/userSlice";
import useNotification from "@/hooks/useNotification";
import { wordFormatter } from "@/utils/helpers";
import { nameRegex, urlRegex } from "@/utils/constants";

const UserSchema = z.object({
  first_name: z.string().min(2).max(14).regex(nameRegex, 'First name should contain only letters'),
  last_name: z.string().min(2).max(14).regex(nameRegex ,'Last name should contain only letters'),
  email: z.string().email(),
  avatar: z.string().regex(urlRegex, 'Please enter valid url'),
})

const UserAction = ({
  userData = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  },
  setShowModal = () => { },
}: {
  userData: UserDataType | null
  setShowModal: (arg: boolean) => void;
}) => {
  const {notifySuccess, notifyError} = useNotification()
  const [dataPayload, setDataPayload] = useState<UserDataType>(userData as UserDataType);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const keys: Array<keyof UserDataType> = ["first_name", "last_name", "email", "avatar"];

  let modalInputs: ModalInput[] = keys.map((key) => ({
    key,
    type: "text",
    required: true,
    maxLength: key === 'first_name' || key === 'last_name' ? 16 : 224,
    onChange: ({ target: { value } }) => {
      let cleaned = value.trimStart().replace(/\s{2,}/g, " ");
      const fieldSchema = UserSchema.shape[key as keyof typeof UserSchema.shape];
      const result = fieldSchema.safeParse(cleaned);
      setFieldErrors((prev) => ({
        ...prev,
        [key]: result.success ? "" : result.error.errors[0]?.message || "Invalid input",
      }));
      setDataPayload((prev) => ({
        ...prev,
        [key]: key == 'email' ? cleaned.toLowerCase() : cleaned,
      }));
    },
  }));

  async function submitModal() {
    setLoading(true);
    const isUpdateCall = !!userData?.id;
    const url = isUpdateCall ? `/users/${userData?.id}` : `/users`;
    const apiAction = isUpdateCall ? userApis.updateUser : userApis.createUser;
    try {
      const response = await apiAction(url, dataPayload);
      const payloadWithId = isUpdateCall ? dataPayload : response.data;
      dispatch(isUpdateCall ? updateUser(payloadWithId) : addUser(payloadWithId));
      notifySuccess(`User ${isUpdateCall ? 'Update' : 'Create'} Success`);
      setShowModal(false);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Zod Schema Errors", error);
      }
      console.error(error);
      notifyError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Modal
      title=<p>{`${!!userData?.first_name ? "Edit User" : "Create New User"}`}</p>
      open={true}
      onOk={submitModal}
      onCancel={() => setShowModal(false)}
      className="user-actions-modal"
      okText={'Submit'}
      okButtonProps={{
        loading,
        disabled: !(Object.values(fieldErrors).every((val) => val === "")) || (!dataPayload.first_name || !dataPayload.last_name || !dataPayload.email || !dataPayload.avatar)
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={dataPayload}
      >
        {modalInputs.map((input) => {
          let inputKey = input.key === 'avatar' ? 'profile_image_link' : input.key
          return <Form.Item
            key={input.key}
            label={wordFormatter(inputKey)}
            name={input.key}
            rules={[
              { required: input.required, message: `Please enter valid ${wordFormatter(inputKey, false)}` },
            ]}
          >
            <Input
              type={input.type}
              value={dataPayload[input.key]}
              placeholder={`Please enter ${wordFormatter(inputKey, false)}`}
              onChange={input.onChange}
              maxLength={input.maxLength}
            />
            <p className="field-error">{fieldErrors[input.key]}</p>
          </Form.Item>
        })}
      </Form>
    </Modal>
  );
};

export default UserAction;
