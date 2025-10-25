export interface IAvatarFrame extends Document {
    name: string; // "Viền học giả", "Viền hoàng gia"
    rarity: "common" | "rare" | "epic" | "legendary";
    price: number; // Bamboo Points
    frameStyle: {
      borderColor?: string; // ví dụ: "#FFD700"
      borderImage?: string; // file ảnh PNG/SVG viền đặc biệt
      glowEffect?: boolean; // viền có ánh sáng
    };
    icon?: string; // emoji nhỏ hiển thị trong shop
    description?: string;
    isDefault?: boolean; // viền mặc định (nếu có)
  }
  