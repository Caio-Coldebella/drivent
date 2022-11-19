export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type paymentTypeEntity = {
  ticketId: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
};

export type paymentType = Partial<paymentTypeEntity>;
