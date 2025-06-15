export type UserDataType = {
  id ?: string | number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
};

export type ModalInput = {
  key: keyof UserDataType;
  type: string;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength : number
};
