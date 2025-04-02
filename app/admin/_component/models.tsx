"use client";
// pages/admin/models.tsx

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { MigrateAIModels } from "./MigrateAIModels";
import ExistingModelsTable from "./ExistingModelsTable";

export default function AdminModelsPage() {
  /*
  const models = useQuery(api.aiModels.list);
  const addModel = useMutation(api.aiModels.add);
  const seedModels = useMutation(api.aiModels.seedAiModels);
  const [isSeeding, setIsSeeding] = useState(false);
*/
  const addModel = useMutation(api.aiModels.createAiModel);

  const form = useForm({
    defaultValues: {
      name: "",
      apiModelName: "",
      maxTokens: "",
      premium: false,
      supportsStreaming: false,
      image: false,
      experimental: false,
      notes: "",
      provider: "Claude",
      sortOrder: 100,
    },
  });

  type FormValues = {
    name: string;
    apiModelName: string;
    maxTokens: string;
    premium: boolean;
    supportsStreaming: boolean;
    image: boolean;
    experimental: boolean;
    notes: string;
    provider: string;
    sortOrder: number;
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // Convert sortOrder to a number
      data.sortOrder = Number(data.sortOrder);
      await addModel(data);
      toast.success(`${data.name} has been added to the database.`);
      form.reset();
    } catch (error) {
      toast.error("Failed to update aiModel", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };
  /*
  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const result = await seedModels();
      toast({
        title: "Database Seeded",
        description: `${result.count} models added`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };
*/
  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">AI Models Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New AI Model</CardTitle>
            <CardDescription>
              Fill in the details to add a new AI model to the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Claude 3.7 Sonnet"
                          {...field}
                          required
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apiModelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Model Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. claude-3-7-sonnet-20250219"
                          {...field}
                          required
                          className="bg-white"
                        />
                      </FormControl>
                      <FormDescription>
                        The identifier used in API calls
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Provider</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10 w-full bg-white">
                              <SelectValue placeholder="Select a provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="claude">Claude</SelectItem>
                            <SelectItem value="openai">OpenAI</SelectItem>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="deepseek">DeepSeek</SelectItem>
                            <SelectItem value="openrouter">
                              OpenRouter
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxTokens"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Max Tokens</FormLabel>
                        <FormControl>
                          <Input
                            className="h-10 bg-white"
                            placeholder="e.g. 200,000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experimental"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Experimental</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          defaultValue={field.value ? "true" : "false"}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10 w-full bg-white">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="premium"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                        <div className="space-y-0.5">
                          <FormLabel>Premium</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={
                              field.value
                                ? "bg-primary data-[state=checked]:bg-primary"
                                : "bg-destructive data-[state=unchecked]:bg-destructive"
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supportsStreaming"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                        <div className="space-y-0.5">
                          <FormLabel>Streaming</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={
                              field.value
                                ? "bg-primary data-[state=checked]:bg-primary"
                                : "bg-destructive data-[state=unchecked]:bg-destructive"
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                        <div className="space-y-0.5">
                          <FormLabel>Image Support</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={
                              field.value
                                ? "bg-primary data-[state=checked]:bg-primary"
                                : "bg-destructive data-[state=unchecked]:bg-destructive"
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="sortOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort Order</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="bg-white" />
                      </FormControl>
                      <FormDescription>
                        Lower numbers appear first in lists
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional information about this model"
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Add Model
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Actions</CardTitle>
            <CardDescription>Manage your AI models database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MigrateAIModels />
            {/* {isSeeding ? "Seeding Database..." : "Seed Default Models"} */}

            <p className="text-sm text-muted-foreground">
              This will add all default AI models to the database if they do not
              already exist.
            </p>
          </CardContent>
        </Card>
      </div>

      <ExistingModelsTable />
    </div>
  );
}
