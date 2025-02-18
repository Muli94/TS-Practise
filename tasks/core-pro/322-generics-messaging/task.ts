type MessageType = 'orderCreated' | 'orderCancelled';

interface Message {
  type: MessageType;
}

interface Items { productId: string; quantity: number }

interface Order {
  orderId: string;
  items: Items[];
}

export interface OrderCreatedMessage {
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage {
  type: 'orderCancelled';
  payload: { orderId: string };
}

type Subscribers = {
  orderCancelled?: (message: OrderCancelledMessage) => void;
  orderCreated?: (message: OrderCreatedMessage) => void;
}

export class MessageBus {
  private subscribers: Subscribers = {};

  subscribe<T extends OrderCreatedMessage | OrderCancelledMessage>(type: MessageType, subscriber: (message: T) => void): void {
   if (type === 'orderCreated') {
     this.subscribers.orderCreated = subscriber as (message: OrderCreatedMessage) => void;
   } else {
     this.subscribers.orderCancelled = subscriber as (message: OrderCancelledMessage) => void;
   }
  }

  publish<T extends OrderCreatedMessage | OrderCancelledMessage>(message: T): void {
    if (message.type === 'orderCancelled') {
      this.subscribers[message.type]?.(message);
      return;
    } else if (message.type === 'orderCreated') {
      this.subscribers[message.type]?.(message);
      return;
    }

    throw new Error('Wrong message type');
  }
}

export class InventoryStockTracker {
  private orders: Order[] = [];

  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.bus.subscribe<OrderCreatedMessage>('orderCreated', (message: OrderCreatedMessage) => {
      this.orders.push(message.payload);

      message.payload.items.forEach((elem: Items) => {
        this.stock[elem.productId] -= elem.quantity;
      })
    })

    this.bus.subscribe<OrderCancelledMessage>('orderCancelled', (message: OrderCancelledMessage) => {
      const cancelledOrder = this.orders.find((elem: Order) => elem.orderId === message.payload.orderId);

      if (!cancelledOrder) {
        return;
      }

      cancelledOrder.items.forEach((elem: Items) => {
        this.stock[elem.productId] += elem.quantity;
      })
    })
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
