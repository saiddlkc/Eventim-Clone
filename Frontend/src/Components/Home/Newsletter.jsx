import { Button, Card, Input, Typography } from "@material-tailwind/react";

export function NewsLetter() {
  return (
    <Card className="my-12 py-10 mx-auto container max-w-5xl px-8 bg-orange-50 shadow-lg">
      <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 !items-center">
        <Typography className="text-black !font-semibold text-center">
          Stay in the Know: Subscribe for Exclusive Updates
        </Typography>
        <div className="flex items-start flex-col gap-4 md:flex-row ">
          <Input label="Enter your Name" />
          <Input label="Enter your email" />
          <Button className="flex-shrink-0 md:w-fit w-full">subscribe</Button>
        </div>
      </div>
    </Card>
  );
}
export default NewsLetter;
