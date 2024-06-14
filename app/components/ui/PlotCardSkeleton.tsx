import { Button, Card, CardBody, Skeleton } from "@nextui-org/react";
import React from "react";

function PlotCardSkeleton() {
  return (
    <Card className="bg-default-100 p-2 w-full">
      <CardBody className="gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-3/5 h-5 rounded-lg" />

          <Skeleton className="rounded-lg">
            <Button variant="ghost" size="sm">
              Generate
            </Button>
          </Skeleton>
        </div>
        <Skeleton className="w-full h-3 rounded-lg" />
        <Skeleton className="w-full h-3 rounded-lg" />
        <Skeleton className="w-2/5 h-3 rounded-lg" />
      </CardBody>
    </Card>
  );
}

export default PlotCardSkeleton;
