// src/pages/TripPage.js
import React from "react";
import AddVisit from "../components/AddVisit";
import PlanCard from "../components/PlanCard";
import FactCard from "../components/FactCard";
import AddFact from "../components/AddFact";
import AddImage from "../components/AddImage";
import ImageCard from "../components/ImageCard";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_TRIP } from "../utils/queries";
import "../style/background.css";

const Trip = () => {
  const { tripId } = useParams();

  const { loading, data } = useQuery(QUERY_TRIP, {
    variables: { tripId: tripId },
  });

  const plans = data?.trip.plans || [];
  const facts = data?.trip.facts || [];
  const images = data?.trip.images || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  const eatPlans = plans.filter((plan) => plan.category.toLowerCase() === "eat");
  const visitPlans = plans.filter((plan) => plan.category.toLowerCase() === "visit");
  const activityPlans = plans.filter((plan) => plan.category.toLowerCase() === "activity");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container mt-3">
          <div className="row row-eq-height">
            <div className="col-md-3">
              <h3>Eat</h3>
              <AddVisit category="eat" tripId={tripId} />
              <PlanCard plans={eatPlans} tripId={tripId} />
            </div>
            <div className="col-md-3">
              <h3>Visit</h3>
              <AddVisit category="visit" tripId={tripId} />
              <PlanCard plans={visitPlans} tripId={tripId} />
            </div>
            <div className="col-md-3">
              <h3>Activity</h3>
              <AddVisit category="activity" tripId={tripId} />
              <PlanCard plans={activityPlans} tripId={tripId} />
            </div>
            <div className="col-md-3">
              <h3>Facts</h3>
              <AddFact tripId={tripId} />
              <FactCard facts={facts} tripId={tripId} />
              <h3 className="mt-3">Images</h3>
              <AddImage tripId={tripId} />
              <ImageCard images={images} tripId={tripId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;