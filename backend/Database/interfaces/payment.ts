interface Payment {
    _id: string; // MongoDB automatically generates this
    rideId: string; // Reference to the Ride schema
    studentId: string; // Reference to the User schema
    amount: number;
    paymentMethod: string;
    transactionId: string;
    status: "pending" | "completed" | "failed";
    createdAt: Date;
    updatedAt: Date;
  }



  //one client is associated to one payment and one ride in the database in during his ride  session;
  