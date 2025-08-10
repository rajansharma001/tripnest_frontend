"use client";
import React from "react";
import { useProtectedRoute } from "../../../../context/useProtected";

const AdminDashboard = () => {
  useProtectedRoute(["admin"]);

  return (
    <div className="top-20">
      <div>
        lidsjfkasf
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia amet
          aperiam explicabo praesentium, et velit maxime temporibus. Nisi veniam
          tempora iste mollitia, expedita sit laudantium tempore et. Facere,
          excepturi dolorum accusantium alias repellat tempore esse nemo
          officiis praesentium numquam soluta nobis totam, quas optio commodi
          adipisci fuga? Dolorum, blanditiis dolores.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
