import { notifications } from "@mantine/notifications";

class Notification {
  public static success(message: string) {
    return notifications.show({
      title: "Success",
      message,
      color: "green",
    });
  }

  public static error(message: string) {
    return notifications.show({
      title: "Error",
      message,
      color: "red",
    });
  }
}

export default Notification;
