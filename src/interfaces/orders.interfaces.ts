import { z } from "zod";
import {
  BaseOrderSchema,
  Order,
  UserDetailOrderSchema,
  createOrderSchema,
  returnCreateOrderSchema,
  returnOrderDataSchema,
} from "../schemas/orders.schemas";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { OrderForUserDetailSchema } from "../schemas/orderItems.schemas";

export interface IOrderContextData {
  data: IOrdersData | undefined;
  createOrder: UseMutateFunction<
    IReturnCreateOrder,
    any,
    ICreateOrderWithFunction,
    unknown
  >;
  setOrdersQuantity: React.Dispatch<React.SetStateAction<number>>;
  ordersQuantity: number;
  statusOrder: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    IStatusOrder,
    unknown
  >;
  deleteOrder: UseMutateFunction<any, unknown, string, unknown>;
  isFetching: boolean;
  statusChange: boolean;
}

export interface ICreateOrder extends z.infer<typeof createOrderSchema> {
  paymentMethod: string;
  orderItems: {
    menuItemId: string;
    quantity: number;
    total: number;
    instructions: string;
  }[];
  orderNumber: number;
}

export type IReturnCreateOrder = z.infer<typeof returnCreateOrderSchema>;

export type IUserDetailOrders = z.infer<typeof UserDetailOrderSchema>;

export interface IUserDetailsOrderProps {
  order: IUserDetailOrders;
}

export type ICreateOrderWithFunction = {
  newOrder: ICreateOrder;
  incrementOrderNumber: () => void;
};

export type IStatusOrder = {
  data: {
    orderId: string;
    orderConfirm?: boolean;
    finishedOrder?: boolean;
    confirmDelivery?: boolean;
     };
};
export type IOrdersData = z.infer<typeof Order>[];

export type IResponseStatusOrder = z.infer<typeof BaseOrderSchema>;

export type IOrderData = z.infer<typeof Order>;



export interface IUserDetailsOrderProps {
  order: IUserDetailOrders;
}