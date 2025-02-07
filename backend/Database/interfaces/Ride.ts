interface Ride {
    _id: string;
    clientId: string; // Reference to the student booking the ride
    driverId: string; // Reference to the driver assigned to the ride
    pickupLocation: string;
    dropoffLocation: string;
    status: "pending" | "accepted" | "in-progress" | "completed" | "cancelled";
    fare: number; // Calculated fare for the ride
    distance: number; // Distance in km/miles
    estimatedTime: number; // Estimated time in minutes
    startedAt?: Date; // When the ride started
    completedAt?: Date; // When the ride ended
    createdAt: Date;
  }

  // a ride is associated to a driver and client through an id // rep the relationship between the entities