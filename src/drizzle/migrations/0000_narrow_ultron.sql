CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" text NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"priority" varchar(10) NOT NULL,
	"due_date" date NOT NULL,
	"assigned_to" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "tasks.assigned_to_index" ON "tasks" USING btree ("assigned_to");