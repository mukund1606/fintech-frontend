"use client";
import { api, isTRPCClientError } from "@/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { toast } from "sonner";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { Button, Input } from "@nextui-org/react";

import { SetIncomeFormSchema } from "@/types/forms";

export default function CreateOrderForm() {
  const form = useForm<z.infer<typeof SetIncomeFormSchema>>({
    resolver: zodResolver(SetIncomeFormSchema),
    defaultValues: {
      income: 0,
      totalBudget: 0,
    },
  });

  const apiUtils = api.useUtils();
  const setIncomeRoute = api.user.setIncome.useMutation({
    async onSuccess() {
      await apiUtils.user.invalidate();
    },
  });

  async function submitForm(data: z.infer<typeof SetIncomeFormSchema>) {
    try {
      const res = await setIncomeRoute.mutateAsync(data);
      toast.success(res.message);
    } catch (e) {
      if (isTRPCClientError(e)) {
        toast.error(e.message);
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex w-full flex-col gap-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <Input
                    label="Income"
                    variant="bordered"
                    description="This is your monthly income including salary."
                    classNames={{
                      description: "text-sm",
                      label: "text-md font-abeezee font-bold",
                      input:
                        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                    }}
                    size="lg"
                    type="number"
                    onWheel={(e) => e.currentTarget.blur()}
                    inputMode="numeric"
                    {...field}
                    value={field.value.toString()}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(parseFloat(value));
                    }}
                    isInvalid={form.formState.errors.income !== undefined}
                    errorMessage={form.formState.errors.income?.message}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalBudget"
              render={({ field }) => (
                <FormItem>
                  <Input
                    label="Total Budget"
                    description="This is the total budget you want to set for the month."
                    variant="bordered"
                    classNames={{
                      description: "text-sm",
                      label: "text-md font-abeezee font-bold",
                      input:
                        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                    }}
                    size="lg"
                    type="number"
                    onWheel={(e) => e.currentTarget.blur()}
                    inputMode="numeric"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(parseFloat(value));
                    }}
                    value={field.value.toString()}
                    isInvalid={form.formState.errors.totalBudget !== undefined}
                    errorMessage={form.formState.errors.totalBudget?.message}
                  />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            color="secondary"
            className="w-full"
            isLoading={setIncomeRoute.isPending}
            isDisabled={setIncomeRoute.isPending}
          >
            Set Income
          </Button>
        </form>
      </Form>
    </div>
  );
}
