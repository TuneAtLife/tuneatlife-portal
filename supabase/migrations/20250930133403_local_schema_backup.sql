create table "public"."audit_logs" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid,
    "entity_type" character varying(100) not null,
    "entity_id" uuid,
    "action" character varying(100) not null,
    "old_values" jsonb,
    "new_values" jsonb,
    "user_id" character varying(255),
    "ip_address" inet,
    "user_agent" text,
    "created_at" timestamp with time zone default now()
);


alter table "public"."audit_logs" enable row level security;

create table "public"."clicks" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "campaign_id" uuid not null,
    "message_id" uuid,
    "user_identifier" character varying(255),
    "ip_address" inet,
    "user_agent" text,
    "referer" text,
    "country_code" character(2),
    "city" character varying(255),
    "attribution_data" jsonb,
    "clicked_at" timestamp with time zone default now(),
    "link_id" uuid
);


alter table "public"."clicks" enable row level security;

create table "public"."consents" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "user_identifier" character varying(255) not null,
    "channel" character varying(50) not null,
    "source_id" uuid,
    "consent_type" character varying(50) not null,
    "status" character varying(50) not null default 'granted'::character varying,
    "granted_at" timestamp with time zone,
    "revoked_at" timestamp with time zone,
    "ip_address" inet,
    "user_agent" text,
    "legal_basis" character varying(100),
    "retention_period_days" integer default 1095,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."consents" enable row level security;

create table "public"."conversions" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "campaign_id" uuid not null,
    "click_id" uuid,
    "user_identifier" character varying(255),
    "conversion_type" character varying(100) not null,
    "conversion_value" numeric(12,2) not null,
    "commission_amount" numeric(12,2) not null,
    "currency_code" character(3) default 'USD'::bpchar,
    "external_transaction_id" character varying(255),
    "attribution_model" character varying(50) default 'last_click'::character varying,
    "converted_at" timestamp with time zone default now(),
    "created_at" timestamp with time zone default now()
);


alter table "public"."conversions" enable row level security;

create table "public"."events" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "event_type" character varying(100) not null,
    "source_platform" character varying(50) not null,
    "source_id" character varying(255) not null,
    "user_identifier" character varying(255),
    "content" text,
    "metadata" jsonb,
    "processed_at" timestamp with time zone,
    "created_at" timestamp with time zone default now()
);


alter table "public"."events" enable row level security;

create table "public"."link_campaigns" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "name" character varying(255) not null,
    "destination_url" text not null,
    "short_code" character varying(50) not null,
    "status" character varying(50) default 'active'::character varying,
    "attribution_window_days" integer default 30,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."link_campaigns" enable row level security;

create table "public"."links" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "campaign_id" uuid,
    "message_id" uuid,
    "source_id" uuid,
    "rule_id" uuid,
    "short_code" character varying(50) not null,
    "destination_url" text not null,
    "utm_source" character varying(255),
    "utm_campaign" character varying(255),
    "utm_content" character varying(255),
    "utm_term" character varying(255),
    "utm_medium" character varying(255) default 'affiliate'::character varying,
    "metadata" jsonb default '{}'::jsonb,
    "expires_at" timestamp with time zone,
    "click_count" integer default 0,
    "first_clicked_at" timestamp with time zone,
    "last_clicked_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."links" enable row level security;

create table "public"."message_templates" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "name" character varying(255) not null,
    "channel" character varying(50) not null,
    "language_code" character(2) default 'en'::bpchar,
    "subject" character varying(500),
    "content" text not null,
    "variables" jsonb default '[]'::jsonb,
    "config" jsonb default '{}'::jsonb,
    "includes_disclosure" boolean default false,
    "includes_opt_out" boolean default false,
    "status" character varying(50) default 'active'::character varying,
    "version" integer default 1,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."message_templates" enable row level security;

create table "public"."messages" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "event_id" uuid,
    "campaign_id" uuid,
    "recipient_id" character varying(255) not null,
    "platform" character varying(50) not null,
    "template_id" uuid,
    "content" text not null,
    "personalization" jsonb,
    "status" character varying(50) default 'pending'::character varying,
    "sent_at" timestamp with time zone,
    "delivered_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "template_version" integer
);


alter table "public"."messages" enable row level security;

create table "public"."partners" (
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying(255) not null,
    "email" character varying(255) not null,
    "phone" character varying(20),
    "company" character varying(255),
    "website" character varying(500),
    "status" character varying(50) default 'active'::character varying,
    "commission_rate" numeric(5,2) default 50.00,
    "total_revenue" numeric(12,2) default 0.00,
    "total_commissions" numeric(12,2) default 0.00,
    "active_campaigns" integer default 0,
    "metadata" jsonb default '{}'::jsonb,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "last_activity_at" timestamp with time zone
);


alter table "public"."partners" enable row level security;

create table "public"."rules" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "name" character varying(255) not null,
    "rule_type" character varying(50) not null,
    "conditions" jsonb not null,
    "actions" jsonb not null,
    "priority" integer default 100,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."rules" enable row level security;

create table "public"."sources" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "channel" character varying(50) not null,
    "handle" character varying(255) not null,
    "name" character varying(255) not null,
    "status" character varying(50) default 'active'::character varying,
    "config" jsonb default '{}'::jsonb,
    "secrets_encrypted" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."sources" enable row level security;

create table "public"."triggers" (
    "id" uuid not null default uuid_generate_v4(),
    "partner_id" uuid not null,
    "event_id" uuid not null,
    "rule_id" uuid not null,
    "source_id" uuid,
    "match_type" character varying(50) not null,
    "match_data" jsonb,
    "action_taken" character varying(100),
    "created_at" timestamp with time zone default now()
);


alter table "public"."triggers" enable row level security;

CREATE UNIQUE INDEX audit_logs_pkey ON public.audit_logs USING btree (id);

CREATE UNIQUE INDEX clicks_pkey ON public.clicks USING btree (id);

CREATE UNIQUE INDEX consents_partner_id_user_identifier_channel_consent_type_key ON public.consents USING btree (partner_id, user_identifier, channel, consent_type);

CREATE UNIQUE INDEX consents_pkey ON public.consents USING btree (id);

CREATE UNIQUE INDEX conversions_pkey ON public.conversions USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE INDEX idx_audit_logs_entity ON public.audit_logs USING btree (entity_type, entity_id);

CREATE INDEX idx_audit_logs_partner_created ON public.audit_logs USING btree (partner_id, created_at DESC);

CREATE INDEX idx_clicks_clicked_at ON public.clicks USING btree (clicked_at DESC);

CREATE INDEX idx_clicks_partner_campaign ON public.clicks USING btree (partner_id, campaign_id);

CREATE INDEX idx_clicks_partner_message_clicked ON public.clicks USING btree (partner_id, message_id, clicked_at DESC);

CREATE INDEX idx_clicks_user_identifier ON public.clicks USING btree (user_identifier) WHERE (user_identifier IS NOT NULL);

CREATE INDEX idx_consents_partner_status ON public.consents USING btree (partner_id, status);

CREATE INDEX idx_consents_source_id ON public.consents USING btree (source_id) WHERE (source_id IS NOT NULL);

CREATE INDEX idx_consents_user_channel ON public.consents USING btree (user_identifier, channel);

CREATE INDEX idx_conversions_click_id ON public.conversions USING btree (click_id) WHERE (click_id IS NOT NULL);

CREATE INDEX idx_conversions_converted_at ON public.conversions USING btree (converted_at DESC);

CREATE INDEX idx_conversions_partner_campaign ON public.conversions USING btree (partner_id, campaign_id);

CREATE INDEX idx_conversions_partner_converted_value ON public.conversions USING btree (partner_id, converted_at DESC, conversion_value);

CREATE INDEX idx_events_partner_created ON public.events USING btree (partner_id, created_at DESC);

CREATE INDEX idx_events_partner_created_platform ON public.events USING btree (partner_id, created_at DESC, source_platform);

CREATE INDEX idx_events_processed ON public.events USING btree (processed_at) WHERE (processed_at IS NOT NULL);

CREATE INDEX idx_events_type_platform ON public.events USING btree (event_type, source_platform);

CREATE INDEX idx_events_user_identifier ON public.events USING btree (user_identifier) WHERE (user_identifier IS NOT NULL);

CREATE INDEX idx_link_campaigns_partner_status ON public.link_campaigns USING btree (partner_id, status);

CREATE INDEX idx_link_campaigns_short_code ON public.link_campaigns USING btree (short_code);

CREATE INDEX idx_links_campaign_id ON public.links USING btree (campaign_id) WHERE (campaign_id IS NOT NULL);

CREATE INDEX idx_links_message_id ON public.links USING btree (message_id) WHERE (message_id IS NOT NULL);

CREATE INDEX idx_links_partner_created ON public.links USING btree (partner_id, created_at DESC);

CREATE INDEX idx_links_short_code ON public.links USING btree (short_code);

CREATE INDEX idx_messages_created ON public.messages USING btree (created_at DESC);

CREATE INDEX idx_messages_partner_event_status ON public.messages USING btree (partner_id, event_id, status, created_at DESC);

CREATE INDEX idx_messages_partner_status ON public.messages USING btree (partner_id, status);

CREATE INDEX idx_messages_recipient ON public.messages USING btree (recipient_id);

CREATE INDEX idx_partners_active_revenue ON public.partners USING btree (status, total_revenue) WHERE ((status)::text = 'active'::text);

CREATE INDEX idx_partners_company ON public.partners USING btree (company) WHERE (company IS NOT NULL);

CREATE INDEX idx_partners_email ON public.partners USING btree (email);

CREATE INDEX idx_partners_last_activity ON public.partners USING btree (last_activity_at) WHERE (last_activity_at IS NOT NULL);

CREATE INDEX idx_partners_metadata ON public.partners USING gin (metadata);

CREATE INDEX idx_partners_status ON public.partners USING btree (status);

CREATE INDEX idx_partners_status_created ON public.partners USING btree (status, created_at);

CREATE INDEX idx_partners_total_revenue ON public.partners USING btree (total_revenue);

CREATE INDEX idx_rules_partner_active ON public.rules USING btree (partner_id, is_active);

CREATE INDEX idx_rules_priority ON public.rules USING btree (priority DESC) WHERE (is_active = true);

CREATE INDEX idx_sources_handle ON public.sources USING btree (channel, handle);

CREATE INDEX idx_sources_partner_channel ON public.sources USING btree (partner_id, channel);

CREATE INDEX idx_templates_partner_channel ON public.message_templates USING btree (partner_id, channel, status);

CREATE INDEX idx_triggers_event_id ON public.triggers USING btree (event_id);

CREATE INDEX idx_triggers_partner_created ON public.triggers USING btree (partner_id, created_at DESC);

CREATE INDEX idx_triggers_partner_created_rule ON public.triggers USING btree (partner_id, created_at DESC, rule_id);

CREATE INDEX idx_triggers_rule_id ON public.triggers USING btree (rule_id);

CREATE UNIQUE INDEX link_campaigns_pkey ON public.link_campaigns USING btree (id);

CREATE UNIQUE INDEX link_campaigns_short_code_key ON public.link_campaigns USING btree (short_code);

CREATE UNIQUE INDEX links_pkey ON public.links USING btree (id);

CREATE UNIQUE INDEX links_short_code_key ON public.links USING btree (short_code);

CREATE UNIQUE INDEX message_templates_pkey ON public.message_templates USING btree (id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE UNIQUE INDEX partners_email_key ON public.partners USING btree (email);

CREATE UNIQUE INDEX partners_pkey ON public.partners USING btree (id);

CREATE UNIQUE INDEX rules_pkey ON public.rules USING btree (id);

CREATE UNIQUE INDEX sources_partner_id_channel_handle_key ON public.sources USING btree (partner_id, channel, handle);

CREATE UNIQUE INDEX sources_pkey ON public.sources USING btree (id);

CREATE UNIQUE INDEX triggers_pkey ON public.triggers USING btree (id);

alter table "public"."audit_logs" add constraint "audit_logs_pkey" PRIMARY KEY using index "audit_logs_pkey";

alter table "public"."clicks" add constraint "clicks_pkey" PRIMARY KEY using index "clicks_pkey";

alter table "public"."consents" add constraint "consents_pkey" PRIMARY KEY using index "consents_pkey";

alter table "public"."conversions" add constraint "conversions_pkey" PRIMARY KEY using index "conversions_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."link_campaigns" add constraint "link_campaigns_pkey" PRIMARY KEY using index "link_campaigns_pkey";

alter table "public"."links" add constraint "links_pkey" PRIMARY KEY using index "links_pkey";

alter table "public"."message_templates" add constraint "message_templates_pkey" PRIMARY KEY using index "message_templates_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."partners" add constraint "partners_pkey" PRIMARY KEY using index "partners_pkey";

alter table "public"."rules" add constraint "rules_pkey" PRIMARY KEY using index "rules_pkey";

alter table "public"."sources" add constraint "sources_pkey" PRIMARY KEY using index "sources_pkey";

alter table "public"."triggers" add constraint "triggers_pkey" PRIMARY KEY using index "triggers_pkey";

alter table "public"."audit_logs" add constraint "audit_logs_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."audit_logs" validate constraint "audit_logs_partner_id_fkey";

alter table "public"."clicks" add constraint "clicks_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES link_campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."clicks" validate constraint "clicks_campaign_id_fkey";

alter table "public"."clicks" add constraint "clicks_link_id_fkey" FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE not valid;

alter table "public"."clicks" validate constraint "clicks_link_id_fkey";

alter table "public"."clicks" add constraint "clicks_message_id_fkey" FOREIGN KEY (message_id) REFERENCES messages(id) not valid;

alter table "public"."clicks" validate constraint "clicks_message_id_fkey";

alter table "public"."clicks" add constraint "clicks_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."clicks" validate constraint "clicks_partner_id_fkey";

alter table "public"."consents" add constraint "consents_channel_check" CHECK (((channel)::text = ANY ((ARRAY['telegram'::character varying, 'meta'::character varying, 'email'::character varying, 'sms'::character varying])::text[]))) not valid;

alter table "public"."consents" validate constraint "consents_channel_check";

alter table "public"."consents" add constraint "consents_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."consents" validate constraint "consents_partner_id_fkey";

alter table "public"."consents" add constraint "consents_partner_id_user_identifier_channel_consent_type_key" UNIQUE using index "consents_partner_id_user_identifier_channel_consent_type_key";

alter table "public"."consents" add constraint "consents_source_id_fkey" FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE SET NULL not valid;

alter table "public"."consents" validate constraint "consents_source_id_fkey";

alter table "public"."consents" add constraint "consents_status_check" CHECK (((status)::text = ANY ((ARRAY['granted'::character varying, 'revoked'::character varying, 'pending'::character varying])::text[]))) not valid;

alter table "public"."consents" validate constraint "consents_status_check";

alter table "public"."conversions" add constraint "conversions_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES link_campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."conversions" validate constraint "conversions_campaign_id_fkey";

alter table "public"."conversions" add constraint "conversions_click_id_fkey" FOREIGN KEY (click_id) REFERENCES clicks(id) not valid;

alter table "public"."conversions" validate constraint "conversions_click_id_fkey";

alter table "public"."conversions" add constraint "conversions_commission_amount_check" CHECK ((commission_amount >= (0)::numeric)) not valid;

alter table "public"."conversions" validate constraint "conversions_commission_amount_check";

alter table "public"."conversions" add constraint "conversions_conversion_value_check" CHECK ((conversion_value >= (0)::numeric)) not valid;

alter table "public"."conversions" validate constraint "conversions_conversion_value_check";

alter table "public"."conversions" add constraint "conversions_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."conversions" validate constraint "conversions_partner_id_fkey";

alter table "public"."events" add constraint "events_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."events" validate constraint "events_partner_id_fkey";

alter table "public"."events" add constraint "events_source_platform_check" CHECK (((source_platform)::text = ANY ((ARRAY['telegram'::character varying, 'meta'::character varying, 'email'::character varying, 'sms'::character varying])::text[]))) not valid;

alter table "public"."events" validate constraint "events_source_platform_check";

alter table "public"."link_campaigns" add constraint "link_campaigns_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."link_campaigns" validate constraint "link_campaigns_partner_id_fkey";

alter table "public"."link_campaigns" add constraint "link_campaigns_short_code_key" UNIQUE using index "link_campaigns_short_code_key";

alter table "public"."link_campaigns" add constraint "link_campaigns_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'paused'::character varying, 'archived'::character varying])::text[]))) not valid;

alter table "public"."link_campaigns" validate constraint "link_campaigns_status_check";

alter table "public"."links" add constraint "links_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES link_campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."links" validate constraint "links_campaign_id_fkey";

alter table "public"."links" add constraint "links_message_id_fkey" FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE not valid;

alter table "public"."links" validate constraint "links_message_id_fkey";

alter table "public"."links" add constraint "links_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."links" validate constraint "links_partner_id_fkey";

alter table "public"."links" add constraint "links_rule_id_fkey" FOREIGN KEY (rule_id) REFERENCES rules(id) ON DELETE SET NULL not valid;

alter table "public"."links" validate constraint "links_rule_id_fkey";

alter table "public"."links" add constraint "links_short_code_key" UNIQUE using index "links_short_code_key";

alter table "public"."links" add constraint "links_source_id_fkey" FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE SET NULL not valid;

alter table "public"."links" validate constraint "links_source_id_fkey";

alter table "public"."message_templates" add constraint "message_templates_channel_check" CHECK (((channel)::text = ANY ((ARRAY['telegram'::character varying, 'meta'::character varying, 'email'::character varying, 'sms'::character varying])::text[]))) not valid;

alter table "public"."message_templates" validate constraint "message_templates_channel_check";

alter table "public"."message_templates" add constraint "message_templates_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."message_templates" validate constraint "message_templates_partner_id_fkey";

alter table "public"."message_templates" add constraint "message_templates_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying, 'draft'::character varying])::text[]))) not valid;

alter table "public"."message_templates" validate constraint "message_templates_status_check";

alter table "public"."messages" add constraint "fk_messages_template_id" FOREIGN KEY (template_id) REFERENCES message_templates(id) not valid;

alter table "public"."messages" validate constraint "fk_messages_template_id";

alter table "public"."messages" add constraint "messages_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES link_campaigns(id) not valid;

alter table "public"."messages" validate constraint "messages_campaign_id_fkey";

alter table "public"."messages" add constraint "messages_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) not valid;

alter table "public"."messages" validate constraint "messages_event_id_fkey";

alter table "public"."messages" add constraint "messages_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_partner_id_fkey";

alter table "public"."messages" add constraint "messages_platform_check" CHECK (((platform)::text = ANY ((ARRAY['telegram'::character varying, 'meta'::character varying, 'email'::character varying, 'sms'::character varying])::text[]))) not valid;

alter table "public"."messages" validate constraint "messages_platform_check";

alter table "public"."messages" add constraint "messages_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'sent'::character varying, 'delivered'::character varying, 'failed'::character varying, 'cancelled'::character varying])::text[]))) not valid;

alter table "public"."messages" validate constraint "messages_status_check";

alter table "public"."partners" add constraint "partners_active_campaigns_check" CHECK ((active_campaigns >= 0)) not valid;

alter table "public"."partners" validate constraint "partners_active_campaigns_check";

alter table "public"."partners" add constraint "partners_commission_rate_check" CHECK (((commission_rate >= (0)::numeric) AND (commission_rate <= (100)::numeric))) not valid;

alter table "public"."partners" validate constraint "partners_commission_rate_check";

alter table "public"."partners" add constraint "partners_email_check" CHECK (((email)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'::text)) not valid;

alter table "public"."partners" validate constraint "partners_email_check";

alter table "public"."partners" add constraint "partners_email_key" UNIQUE using index "partners_email_key";

alter table "public"."partners" add constraint "partners_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying, 'suspended'::character varying, 'pending_approval'::character varying, 'terminated'::character varying, 'under_review'::character varying])::text[]))) not valid;

alter table "public"."partners" validate constraint "partners_status_check";

alter table "public"."partners" add constraint "partners_total_commissions_check" CHECK ((total_commissions >= 0.00)) not valid;

alter table "public"."partners" validate constraint "partners_total_commissions_check";

alter table "public"."partners" add constraint "partners_total_revenue_check" CHECK ((total_revenue >= 0.00)) not valid;

alter table "public"."partners" validate constraint "partners_total_revenue_check";

alter table "public"."rules" add constraint "rules_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."rules" validate constraint "rules_partner_id_fkey";

alter table "public"."rules" add constraint "rules_rule_type_check" CHECK (((rule_type)::text = ANY ((ARRAY['keyword'::character varying, 'classification'::character varying, 'compliance'::character varying, 'rate_limit'::character varying])::text[]))) not valid;

alter table "public"."rules" validate constraint "rules_rule_type_check";

alter table "public"."sources" add constraint "sources_channel_check" CHECK (((channel)::text = ANY ((ARRAY['telegram'::character varying, 'meta'::character varying, 'email'::character varying, 'sms'::character varying])::text[]))) not valid;

alter table "public"."sources" validate constraint "sources_channel_check";

alter table "public"."sources" add constraint "sources_partner_id_channel_handle_key" UNIQUE using index "sources_partner_id_channel_handle_key";

alter table "public"."sources" add constraint "sources_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."sources" validate constraint "sources_partner_id_fkey";

alter table "public"."sources" add constraint "sources_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'paused'::character varying, 'archived'::character varying])::text[]))) not valid;

alter table "public"."sources" validate constraint "sources_status_check";

alter table "public"."triggers" add constraint "triggers_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."triggers" validate constraint "triggers_event_id_fkey";

alter table "public"."triggers" add constraint "triggers_partner_id_fkey" FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE not valid;

alter table "public"."triggers" validate constraint "triggers_partner_id_fkey";

alter table "public"."triggers" add constraint "triggers_rule_id_fkey" FOREIGN KEY (rule_id) REFERENCES rules(id) ON DELETE CASCADE not valid;

alter table "public"."triggers" validate constraint "triggers_rule_id_fkey";

alter table "public"."triggers" add constraint "triggers_source_id_fkey" FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE SET NULL not valid;

alter table "public"."triggers" validate constraint "triggers_source_id_fkey";

set check_function_bodies = off;

create materialized view "public"."analytics_dashboard_cache" as  SELECT p.id AS partner_id,
    p.name AS partner_name,
    now() AS last_updated,
    (COALESCE(count(DISTINCT e.id), (0)::bigint))::integer AS total_events,
    (COALESCE(count(DISTINCT e.id) FILTER (WHERE (e.created_at >= (now() - '24:00:00'::interval))), (0)::bigint))::integer AS events_24h,
    (COALESCE(count(DISTINCT t.id), (0)::bigint))::integer AS total_triggers,
    (COALESCE(count(DISTINCT t.id) FILTER (WHERE (t.created_at >= (now() - '24:00:00'::interval))), (0)::bigint))::integer AS triggers_24h,
    (COALESCE(count(DISTINCT m.id), (0)::bigint))::integer AS messages_sent,
    (COALESCE(count(DISTINCT m.id) FILTER (WHERE (m.created_at >= (now() - '24:00:00'::interval))), (0)::bigint))::integer AS messages_24h,
    (COALESCE(count(DISTINCT c.id), (0)::bigint))::integer AS total_clicks,
    (COALESCE(count(DISTINCT c.id) FILTER (WHERE (c.clicked_at >= (now() - '24:00:00'::interval))), (0)::bigint))::integer AS clicks_24h,
    (COALESCE(count(DISTINCT conv.id), (0)::bigint))::integer AS total_conversions,
    (COALESCE(count(DISTINCT conv.id) FILTER (WHERE (conv.converted_at >= (now() - '24:00:00'::interval))), (0)::bigint))::integer AS conversions_24h,
        CASE
            WHEN (count(DISTINCT e.id) > 0) THEN round((((count(DISTINCT t.id))::numeric / (count(DISTINCT e.id))::numeric) * (100)::numeric), 1)
            ELSE 0.0
        END AS trigger_rate,
        CASE
            WHEN (count(DISTINCT t.id) > 0) THEN round((((count(DISTINCT m.id) FILTER (WHERE ((m.status)::text = 'sent'::text)))::numeric / (count(DISTINCT t.id))::numeric) * (100)::numeric), 1)
            ELSE 0.0
        END AS message_success_rate,
        CASE
            WHEN (count(DISTINCT m.id) > 0) THEN round((((count(DISTINCT c.id))::numeric / (count(DISTINCT m.id))::numeric) * (100)::numeric), 1)
            ELSE 0.0
        END AS click_through_rate,
        CASE
            WHEN (count(DISTINCT c.id) > 0) THEN round((((count(DISTINCT conv.id))::numeric / (count(DISTINCT c.id))::numeric) * (100)::numeric), 1)
            ELSE 0.0
        END AS conversion_rate,
    (COALESCE(sum(conv.conversion_value) FILTER (WHERE (conv.converted_at >= (now() - '30 days'::interval))), 0.0))::numeric(12,2) AS revenue_30d,
    (COALESCE(sum(conv.commission_amount) FILTER (WHERE (conv.converted_at >= (now() - '30 days'::interval))), 0.0))::numeric(12,2) AS commission_30d,
        CASE
            WHEN (count(DISTINCT conv.id) FILTER (WHERE (conv.converted_at >= (now() - '30 days'::interval))) > 0) THEN round((sum(conv.conversion_value) FILTER (WHERE (conv.converted_at >= (now() - '30 days'::interval))) / (count(DISTINCT conv.id) FILTER (WHERE (conv.converted_at >= (now() - '30 days'::interval))))::numeric), 2)
            ELSE 0.0
        END AS revenue_per_conversion,
        CASE
            WHEN (count(DISTINCT m.id) FILTER (WHERE (m.created_at >= (now() - '30 days'::interval))) > 0) THEN round((sum(conv.conversion_value) FILTER (WHERE (conv.converted_at >= (now() - '30 days'::interval))) / (count(DISTINCT m.id) FILTER (WHERE (m.created_at >= (now() - '30 days'::interval))))::numeric), 2)
            ELSE 0.0
        END AS revenue_per_message
   FROM (((((partners p
     LEFT JOIN events e ON ((p.id = e.partner_id)))
     LEFT JOIN triggers t ON ((p.id = t.partner_id)))
     LEFT JOIN messages m ON ((p.id = m.partner_id)))
     LEFT JOIN clicks c ON ((p.id = c.partner_id)))
     LEFT JOIN conversions conv ON ((p.id = conv.partner_id)))
  GROUP BY p.id, p.name;


CREATE OR REPLACE FUNCTION public.create_link(p_partner_id uuid, p_destination_url text, p_campaign_id uuid DEFAULT NULL::uuid, p_message_id uuid DEFAULT NULL::uuid, p_source_id uuid DEFAULT NULL::uuid, p_rule_id uuid DEFAULT NULL::uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    link_id UUID;
    short_code TEXT;
    attempts INTEGER := 0;
BEGIN
    -- Generate unique short code
    LOOP
        short_code := generate_short_code();
        attempts := attempts + 1;
        
        -- Check if code is unique
        IF NOT EXISTS (SELECT 1 FROM links WHERE short_code = short_code) THEN
            EXIT;
        END IF;
        
        -- Prevent infinite loop
        IF attempts > 100 THEN
            RAISE EXCEPTION 'Could not generate unique short code after % attempts', attempts;
        END IF;
    END LOOP;
    
    -- Create the link
    INSERT INTO links (
        partner_id,
        campaign_id,
        message_id,
        source_id,
        rule_id,
        short_code,
        destination_url,
        utm_source,
        utm_campaign,
        utm_content
    ) VALUES (
        p_partner_id,
        p_campaign_id,
        p_message_id,
        p_source_id,
        p_rule_id,
        short_code,
        p_destination_url,
        COALESCE((SELECT handle FROM sources WHERE id = p_source_id), 'direct'),
        COALESCE((SELECT name FROM link_campaigns WHERE id = p_campaign_id), 'default'),
        COALESCE(p_message_id::text, 'organic')
    ) RETURNING id INTO link_id;
    
    RETURN link_id;
END;
$function$
;

create or replace view "public"."dashboard_metrics" as  SELECT p.id AS partner_id,
    p.name AS partner_name,
    count(DISTINCT e.id) AS total_events,
    count(DISTINCT e.id) FILTER (WHERE (e.created_at >= (now() - '24:00:00'::interval))) AS events_24h,
    count(DISTINCT t.id) AS total_triggers,
    count(DISTINCT t.id) FILTER (WHERE (t.created_at >= (now() - '24:00:00'::interval))) AS triggers_24h,
    count(DISTINCT m.id) AS total_messages,
    count(DISTINCT m.id) FILTER (WHERE (m.created_at >= (now() - '24:00:00'::interval))) AS messages_24h,
    count(DISTINCT m.id) FILTER (WHERE ((m.status)::text = 'sent'::text)) AS messages_sent,
    count(DISTINCT l.id) AS total_links,
    sum(l.click_count) AS total_clicks,
    count(DISTINCT c.id) FILTER (WHERE (c.clicked_at >= (now() - '24:00:00'::interval))) AS clicks_24h,
    count(DISTINCT conv.id) AS total_conversions,
    count(DISTINCT conv.id) FILTER (WHERE (conv.converted_at >= (now() - '24:00:00'::interval))) AS conversions_24h,
    sum(conv.conversion_value) FILTER (WHERE (conv.converted_at >= (now() - '30 days'::interval))) AS revenue_30d,
    sum(conv.commission_amount) FILTER (WHERE (conv.converted_at >= (now() - '30 days'::interval))) AS commission_30d
   FROM ((((((partners p
     LEFT JOIN events e ON ((p.id = e.partner_id)))
     LEFT JOIN triggers t ON ((p.id = t.partner_id)))
     LEFT JOIN messages m ON ((p.id = m.partner_id)))
     LEFT JOIN links l ON ((p.id = l.partner_id)))
     LEFT JOIN clicks c ON ((p.id = c.partner_id)))
     LEFT JOIN conversions conv ON ((p.id = conv.partner_id)))
  GROUP BY p.id, p.name;


CREATE OR REPLACE FUNCTION public.generate_short_code(length integer DEFAULT 8)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..length LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.generate_test_data(num_partners integer DEFAULT 10)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    partner_id UUID;
    campaign_id UUID;
    i INTEGER;
    j INTEGER;
BEGIN
    -- Generate test partners
    FOR i IN 1..num_partners LOOP
        INSERT INTO partners (name, email) 
        VALUES (
            'Test Partner ' || i,
            'partner' || i || '@test.example.com'
        ) RETURNING id INTO partner_id;
        
        -- Generate campaigns for each partner
        FOR j IN 1..5 LOOP
            INSERT INTO link_campaigns (partner_id, name, destination_url, short_code)
            VALUES (
                partner_id,
                'Campaign ' || j || ' for Partner ' || i,
                'https://example.com/offer/' || j,
                'p' || i || 'c' || j || substring(md5(random()::text), 1, 6)
            ) RETURNING id INTO campaign_id;
        END LOOP;
    END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_channel_breakdown(p_partner_id uuid)
 RETURNS TABLE(channel character varying, events integer, messages_sent integer, clicks integer, conversions integer, revenue numeric)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(e.source_platform, m.platform, 'unknown')::VARCHAR(50) as channel,
        COUNT(DISTINCT e.id)::integer as events,
        COUNT(DISTINCT m.id) FILTER (WHERE m.status = 'sent')::integer as messages_sent,
        COUNT(DISTINCT c.id)::integer as clicks,
        COUNT(DISTINCT conv.id)::integer as conversions,
        COALESCE(SUM(conv.conversion_value), 0.0)::numeric(12,2) as revenue
    FROM partners p
    LEFT JOIN events e ON p.id = e.partner_id
    LEFT JOIN messages m ON p.id = m.partner_id
    LEFT JOIN clicks c ON p.id = c.partner_id AND c.partner_id = p_partner_id
    LEFT JOIN conversions conv ON p.id = conv.partner_id AND conv.partner_id = p_partner_id
    WHERE p.id = p_partner_id
    GROUP BY COALESCE(e.source_platform, m.platform, 'unknown')
    HAVING COUNT(DISTINCT e.id) > 0 OR COUNT(DISTINCT m.id) > 0 OR COUNT(DISTINCT c.id) > 0
    ORDER BY events DESC, revenue DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_conversion_details(p_partner_id uuid, p_start_date date DEFAULT ((CURRENT_DATE - '30 days'::interval))::date, p_end_date date DEFAULT CURRENT_DATE, p_status character varying DEFAULT NULL::character varying, p_min_value numeric DEFAULT NULL::numeric, p_limit integer DEFAULT 100, p_offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, external_transaction_id character varying, conversion_type character varying, status character varying, conversion_value numeric, commission_amount numeric, currency_code character, event_id uuid, rule_id uuid, message_id uuid, link_id uuid, click_id uuid, channel character varying, event_timestamp timestamp with time zone, message_timestamp timestamp with time zone, click_timestamp timestamp with time zone, conversion_timestamp timestamp with time zone, time_to_conversion_minutes integer, created_at timestamp with time zone, updated_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    start_ts TIMESTAMP WITH TIME ZONE;
    end_ts TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Convert dates to timestamps
    start_ts := p_start_date::TIMESTAMP WITH TIME ZONE;
    end_ts := (p_end_date + INTERVAL '1 day')::TIMESTAMP WITH TIME ZONE;
    
    RETURN QUERY
    SELECT 
        conv.id,
        conv.external_transaction_id,
        conv.conversion_type,
        conv.conversion_type as status,  -- Mapping needed based on actual schema
        conv.conversion_value,
        conv.commission_amount,
        conv.currency_code,
        -- Attribution chain (reconstructed from relationships)
        m.event_id,
        t.rule_id,
        c.message_id,
        c.link_id,
        c.id as click_id,
        e.source_platform as channel,
        -- Timing analysis
        e.created_at as event_timestamp,
        m.created_at as message_timestamp,
        c.clicked_at as click_timestamp,
        conv.converted_at as conversion_timestamp,
        EXTRACT(EPOCH FROM (conv.converted_at - e.created_at))::integer / 60 as time_to_conversion_minutes,
        -- Metadata
        conv.created_at,
        conv.created_at as updated_at  -- Mapping needed based on actual schema
    FROM conversions conv
    LEFT JOIN clicks c ON conv.click_id = c.id
    LEFT JOIN messages m ON c.message_id = m.id
    LEFT JOIN events e ON m.event_id = e.id
    LEFT JOIN triggers t ON e.id = t.event_id AND m.partner_id = t.partner_id
    WHERE conv.partner_id = p_partner_id
        AND conv.converted_at >= start_ts AND conv.converted_at < end_ts
        AND (p_status IS NULL OR conv.conversion_type = p_status)  -- Mapping needed
        AND (p_min_value IS NULL OR conv.conversion_value >= p_min_value)
    ORDER BY conv.converted_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_performance_analytics(p_partner_id uuid, p_start_date date DEFAULT ((CURRENT_DATE - '30 days'::interval))::date, p_end_date date DEFAULT CURRENT_DATE, p_granularity text DEFAULT 'day'::text, p_channel character varying DEFAULT NULL::character varying, p_campaign_id uuid DEFAULT NULL::uuid, p_rule_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(total_events integer, total_messages integer, total_clicks integer, total_conversions integer, total_revenue numeric, total_commission numeric, time_series jsonb, channel_performance jsonb, rule_performance jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    date_trunc_format TEXT;
    start_ts TIMESTAMP WITH TIME ZONE;
    end_ts TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Convert dates to timestamps
    start_ts := p_start_date::TIMESTAMP WITH TIME ZONE;
    end_ts := (p_end_date + INTERVAL '1 day')::TIMESTAMP WITH TIME ZONE;
    
    -- Set date truncation format based on granularity
    date_trunc_format := CASE p_granularity
        WHEN 'hour' THEN 'hour'
        WHEN 'day' THEN 'day'
        WHEN 'week' THEN 'week'
        WHEN 'month' THEN 'month'
        ELSE 'day'
    END;
    
    -- Get summary metrics
    SELECT 
        COUNT(DISTINCT e.id)::integer,
        COUNT(DISTINCT m.id)::integer,
        COUNT(DISTINCT c.id)::integer,
        COUNT(DISTINCT conv.id)::integer,
        COALESCE(SUM(conv.conversion_value), 0.0)::numeric(12,2),
        COALESCE(SUM(conv.commission_amount), 0.0)::numeric(12,2)
    INTO total_events, total_messages, total_clicks, total_conversions, total_revenue, total_commission
    FROM events e
    LEFT JOIN messages m ON e.partner_id = m.partner_id AND e.id = m.event_id
    LEFT JOIN clicks c ON m.partner_id = c.partner_id AND m.id = c.message_id
    LEFT JOIN conversions conv ON c.partner_id = conv.partner_id AND c.id = conv.click_id
    WHERE e.partner_id = p_partner_id
        AND e.created_at >= start_ts AND e.created_at < end_ts
        AND (p_channel IS NULL OR e.source_platform = p_channel)
        AND (p_campaign_id IS NULL OR EXISTS (
            SELECT 1 FROM links l WHERE l.message_id = m.id AND l.campaign_id = p_campaign_id
        ));
    
    -- Get time series data
    WITH time_series_data AS (
        SELECT 
            date_trunc(date_trunc_format, e.created_at) as time_bucket,
            COUNT(DISTINCT e.id) as events,
            COUNT(DISTINCT m.id) as messages,
            COUNT(DISTINCT c.id) as clicks,
            COUNT(DISTINCT conv.id) as conversions,
            COALESCE(SUM(conv.conversion_value), 0.0) as revenue
        FROM events e
        LEFT JOIN messages m ON e.partner_id = m.partner_id AND e.id = m.event_id
        LEFT JOIN clicks c ON m.partner_id = c.partner_id AND m.id = c.message_id
        LEFT JOIN conversions conv ON c.partner_id = conv.partner_id AND c.id = conv.click_id
        WHERE e.partner_id = p_partner_id
            AND e.created_at >= start_ts AND e.created_at < end_ts
            AND (p_channel IS NULL OR e.source_platform = p_channel)
        GROUP BY date_trunc(date_trunc_format, e.created_at)
        ORDER BY time_bucket
    )
    SELECT jsonb_agg(
        jsonb_build_object(
            'timestamp', time_bucket,
            'events', events,
            'messages', messages,
            'clicks', clicks,
            'conversions', conversions,
            'revenue', revenue
        )
    ) INTO time_series
    FROM time_series_data;
    
    -- Get channel performance
    WITH channel_data AS (
        SELECT 
            e.source_platform as channel,
            COUNT(DISTINCT e.id) as events,
            COUNT(DISTINCT m.id) as messages,
            COUNT(DISTINCT c.id) as clicks,
            COUNT(DISTINCT conv.id) as conversions,
            COALESCE(SUM(conv.conversion_value), 0.0) as revenue,
            CASE 
                WHEN COUNT(DISTINCT c.id) > 0 THEN ROUND((COUNT(DISTINCT conv.id)::numeric / COUNT(DISTINCT c.id)::numeric) * 100, 2)
                ELSE 0.0 
            END as conversion_rate
        FROM events e
        LEFT JOIN messages m ON e.partner_id = m.partner_id AND e.id = m.event_id
        LEFT JOIN clicks c ON m.partner_id = c.partner_id AND m.id = c.message_id
        LEFT JOIN conversions conv ON c.partner_id = conv.partner_id AND c.id = conv.click_id
        WHERE e.partner_id = p_partner_id
            AND e.created_at >= start_ts AND e.created_at < end_ts
        GROUP BY e.source_platform
        HAVING COUNT(DISTINCT e.id) > 0
        ORDER BY revenue DESC
    )
    SELECT jsonb_agg(
        jsonb_build_object(
            'channel', channel,
            'events', events,
            'messages', messages,
            'clicks', clicks,
            'conversions', conversions,
            'revenue', revenue,
            'conversion_rate', conversion_rate
        )
    ) INTO channel_performance
    FROM channel_data;
    
    -- Get rule performance
    WITH rule_data AS (
        SELECT 
            r.id as rule_id,
            r.name as rule_name,
            COUNT(DISTINCT t.id) as triggers,
            COUNT(DISTINCT m.id) as messages,
            COUNT(DISTINCT c.id) as clicks,
            COUNT(DISTINCT conv.id) as conversions,
            COALESCE(SUM(conv.conversion_value), 0.0) as revenue,
            -- ROI calculation: revenue / estimated cost (assuming $0.01 per message)
            CASE 
                WHEN COUNT(DISTINCT m.id) > 0 THEN 
                    ROUND((COALESCE(SUM(conv.conversion_value), 0.0) - (COUNT(DISTINCT m.id) * 0.01)) / (COUNT(DISTINCT m.id) * 0.01) * 100, 2)
                ELSE 0.0 
            END as roi
        FROM rules r
        LEFT JOIN triggers t ON r.id = t.rule_id
        LEFT JOIN messages m ON t.id = m.template_id::uuid  -- Assuming template_id maps to trigger
        LEFT JOIN clicks c ON m.id = c.message_id
        LEFT JOIN conversions conv ON c.id = conv.click_id
        WHERE r.partner_id = p_partner_id
            AND (p_rule_id IS NULL OR r.id = p_rule_id)
            AND t.created_at >= start_ts AND t.created_at < end_ts
        GROUP BY r.id, r.name
        HAVING COUNT(DISTINCT t.id) > 0
        ORDER BY revenue DESC
    )
    SELECT jsonb_agg(
        jsonb_build_object(
            'rule_id', rule_id,
            'rule_name', rule_name,
            'triggers', triggers,
            'messages', messages,
            'clicks', clicks,
            'conversions', conversions,
            'revenue', revenue,
            'roi', roi
        )
    ) INTO rule_performance
    FROM rule_data;
    
    -- Return results
    RETURN NEXT;
END;
$function$
;

create or replace view "public"."performance_metrics" as  SELECT 'events'::text AS table_name,
    count(*) AS record_count,
    min(events.created_at) AS oldest_record,
    max(events.created_at) AS newest_record
   FROM events
UNION ALL
 SELECT 'messages'::text AS table_name,
    count(*) AS record_count,
    min(messages.created_at) AS oldest_record,
    max(messages.created_at) AS newest_record
   FROM messages
UNION ALL
 SELECT 'clicks'::text AS table_name,
    count(*) AS record_count,
    min(clicks.clicked_at) AS oldest_record,
    max(clicks.clicked_at) AS newest_record
   FROM clicks
UNION ALL
 SELECT 'conversions'::text AS table_name,
    count(*) AS record_count,
    min(conversions.created_at) AS oldest_record,
    max(conversions.created_at) AS newest_record
   FROM conversions;


CREATE OR REPLACE FUNCTION public.record_click(p_link_id uuid, p_user_identifier character varying DEFAULT NULL::character varying, p_ip_address inet DEFAULT NULL::inet, p_user_agent text DEFAULT NULL::text, p_referer text DEFAULT NULL::text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    click_id UUID;
    link_partner_id UUID;
BEGIN
    -- Get partner_id from link
    SELECT partner_id INTO link_partner_id FROM links WHERE id = p_link_id;
    
    IF link_partner_id IS NULL THEN
        RAISE EXCEPTION 'Link not found: %', p_link_id;
    END IF;
    
    -- Record the click
    INSERT INTO clicks (
        partner_id,
        link_id,
        user_identifier,
        ip_address,
        user_agent,
        referer
    ) VALUES (
        link_partner_id,
        p_link_id,
        p_user_identifier,
        p_ip_address,
        p_user_agent,
        p_referer
    ) RETURNING id INTO click_id;
    
    -- Update link stats
    UPDATE links 
    SET 
        click_count = click_count + 1,
        first_clicked_at = COALESCE(first_clicked_at, NOW()),
        last_clicked_at = NOW(),
        updated_at = NOW()
    WHERE id = p_link_id;
    
    RETURN click_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.refresh_dashboard_cache()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY analytics_dashboard_cache;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.schedule_analytics_refresh()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    -- This would be called by a cron job every 5 minutes
    PERFORM refresh_dashboard_cache();
    
    -- Clean up old performance data if needed
    DELETE FROM events WHERE created_at < NOW() - INTERVAL '2 years';
    DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL '1 year';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.simulate_webhook_event(p_partner_id uuid, p_event_type character varying DEFAULT 'message_received'::character varying, p_platform character varying DEFAULT 'telegram'::character varying)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    event_id UUID;
BEGIN
    INSERT INTO events (
        partner_id,
        event_type,
        source_platform,
        source_id,
        user_identifier,
        content,
        metadata
    ) VALUES (
        p_partner_id,
        p_event_type,
        p_platform,
        'test_' || gen_random_uuid()::text,
        'user_' || floor(random() * 10000)::text,
        'Test message content for performance testing',
        jsonb_build_object(
            'timestamp', NOW(),
            'source', 'performance_test',
            'test_run_id', gen_random_uuid()
        )
    ) RETURNING id INTO event_id;
    
    RETURN event_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

CREATE UNIQUE INDEX idx_analytics_dashboard_cache_partner ON public.analytics_dashboard_cache USING btree (partner_id);

grant delete on table "public"."audit_logs" to "anon";

grant insert on table "public"."audit_logs" to "anon";

grant references on table "public"."audit_logs" to "anon";

grant select on table "public"."audit_logs" to "anon";

grant trigger on table "public"."audit_logs" to "anon";

grant truncate on table "public"."audit_logs" to "anon";

grant update on table "public"."audit_logs" to "anon";

grant delete on table "public"."audit_logs" to "authenticated";

grant insert on table "public"."audit_logs" to "authenticated";

grant references on table "public"."audit_logs" to "authenticated";

grant select on table "public"."audit_logs" to "authenticated";

grant trigger on table "public"."audit_logs" to "authenticated";

grant truncate on table "public"."audit_logs" to "authenticated";

grant update on table "public"."audit_logs" to "authenticated";

grant delete on table "public"."audit_logs" to "service_role";

grant insert on table "public"."audit_logs" to "service_role";

grant references on table "public"."audit_logs" to "service_role";

grant select on table "public"."audit_logs" to "service_role";

grant trigger on table "public"."audit_logs" to "service_role";

grant truncate on table "public"."audit_logs" to "service_role";

grant update on table "public"."audit_logs" to "service_role";

grant delete on table "public"."clicks" to "anon";

grant insert on table "public"."clicks" to "anon";

grant references on table "public"."clicks" to "anon";

grant select on table "public"."clicks" to "anon";

grant trigger on table "public"."clicks" to "anon";

grant truncate on table "public"."clicks" to "anon";

grant update on table "public"."clicks" to "anon";

grant delete on table "public"."clicks" to "authenticated";

grant insert on table "public"."clicks" to "authenticated";

grant references on table "public"."clicks" to "authenticated";

grant select on table "public"."clicks" to "authenticated";

grant trigger on table "public"."clicks" to "authenticated";

grant truncate on table "public"."clicks" to "authenticated";

grant update on table "public"."clicks" to "authenticated";

grant delete on table "public"."clicks" to "service_role";

grant insert on table "public"."clicks" to "service_role";

grant references on table "public"."clicks" to "service_role";

grant select on table "public"."clicks" to "service_role";

grant trigger on table "public"."clicks" to "service_role";

grant truncate on table "public"."clicks" to "service_role";

grant update on table "public"."clicks" to "service_role";

grant delete on table "public"."consents" to "anon";

grant insert on table "public"."consents" to "anon";

grant references on table "public"."consents" to "anon";

grant select on table "public"."consents" to "anon";

grant trigger on table "public"."consents" to "anon";

grant truncate on table "public"."consents" to "anon";

grant update on table "public"."consents" to "anon";

grant delete on table "public"."consents" to "authenticated";

grant insert on table "public"."consents" to "authenticated";

grant references on table "public"."consents" to "authenticated";

grant select on table "public"."consents" to "authenticated";

grant trigger on table "public"."consents" to "authenticated";

grant truncate on table "public"."consents" to "authenticated";

grant update on table "public"."consents" to "authenticated";

grant delete on table "public"."consents" to "service_role";

grant insert on table "public"."consents" to "service_role";

grant references on table "public"."consents" to "service_role";

grant select on table "public"."consents" to "service_role";

grant trigger on table "public"."consents" to "service_role";

grant truncate on table "public"."consents" to "service_role";

grant update on table "public"."consents" to "service_role";

grant delete on table "public"."conversions" to "anon";

grant insert on table "public"."conversions" to "anon";

grant references on table "public"."conversions" to "anon";

grant select on table "public"."conversions" to "anon";

grant trigger on table "public"."conversions" to "anon";

grant truncate on table "public"."conversions" to "anon";

grant update on table "public"."conversions" to "anon";

grant delete on table "public"."conversions" to "authenticated";

grant insert on table "public"."conversions" to "authenticated";

grant references on table "public"."conversions" to "authenticated";

grant select on table "public"."conversions" to "authenticated";

grant trigger on table "public"."conversions" to "authenticated";

grant truncate on table "public"."conversions" to "authenticated";

grant update on table "public"."conversions" to "authenticated";

grant delete on table "public"."conversions" to "service_role";

grant insert on table "public"."conversions" to "service_role";

grant references on table "public"."conversions" to "service_role";

grant select on table "public"."conversions" to "service_role";

grant trigger on table "public"."conversions" to "service_role";

grant truncate on table "public"."conversions" to "service_role";

grant update on table "public"."conversions" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."link_campaigns" to "anon";

grant insert on table "public"."link_campaigns" to "anon";

grant references on table "public"."link_campaigns" to "anon";

grant select on table "public"."link_campaigns" to "anon";

grant trigger on table "public"."link_campaigns" to "anon";

grant truncate on table "public"."link_campaigns" to "anon";

grant update on table "public"."link_campaigns" to "anon";

grant delete on table "public"."link_campaigns" to "authenticated";

grant insert on table "public"."link_campaigns" to "authenticated";

grant references on table "public"."link_campaigns" to "authenticated";

grant select on table "public"."link_campaigns" to "authenticated";

grant trigger on table "public"."link_campaigns" to "authenticated";

grant truncate on table "public"."link_campaigns" to "authenticated";

grant update on table "public"."link_campaigns" to "authenticated";

grant delete on table "public"."link_campaigns" to "service_role";

grant insert on table "public"."link_campaigns" to "service_role";

grant references on table "public"."link_campaigns" to "service_role";

grant select on table "public"."link_campaigns" to "service_role";

grant trigger on table "public"."link_campaigns" to "service_role";

grant truncate on table "public"."link_campaigns" to "service_role";

grant update on table "public"."link_campaigns" to "service_role";

grant delete on table "public"."links" to "anon";

grant insert on table "public"."links" to "anon";

grant references on table "public"."links" to "anon";

grant select on table "public"."links" to "anon";

grant trigger on table "public"."links" to "anon";

grant truncate on table "public"."links" to "anon";

grant update on table "public"."links" to "anon";

grant delete on table "public"."links" to "authenticated";

grant insert on table "public"."links" to "authenticated";

grant references on table "public"."links" to "authenticated";

grant select on table "public"."links" to "authenticated";

grant trigger on table "public"."links" to "authenticated";

grant truncate on table "public"."links" to "authenticated";

grant update on table "public"."links" to "authenticated";

grant delete on table "public"."links" to "service_role";

grant insert on table "public"."links" to "service_role";

grant references on table "public"."links" to "service_role";

grant select on table "public"."links" to "service_role";

grant trigger on table "public"."links" to "service_role";

grant truncate on table "public"."links" to "service_role";

grant update on table "public"."links" to "service_role";

grant delete on table "public"."message_templates" to "anon";

grant insert on table "public"."message_templates" to "anon";

grant references on table "public"."message_templates" to "anon";

grant select on table "public"."message_templates" to "anon";

grant trigger on table "public"."message_templates" to "anon";

grant truncate on table "public"."message_templates" to "anon";

grant update on table "public"."message_templates" to "anon";

grant delete on table "public"."message_templates" to "authenticated";

grant insert on table "public"."message_templates" to "authenticated";

grant references on table "public"."message_templates" to "authenticated";

grant select on table "public"."message_templates" to "authenticated";

grant trigger on table "public"."message_templates" to "authenticated";

grant truncate on table "public"."message_templates" to "authenticated";

grant update on table "public"."message_templates" to "authenticated";

grant delete on table "public"."message_templates" to "service_role";

grant insert on table "public"."message_templates" to "service_role";

grant references on table "public"."message_templates" to "service_role";

grant select on table "public"."message_templates" to "service_role";

grant trigger on table "public"."message_templates" to "service_role";

grant truncate on table "public"."message_templates" to "service_role";

grant update on table "public"."message_templates" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

grant delete on table "public"."partners" to "anon";

grant insert on table "public"."partners" to "anon";

grant references on table "public"."partners" to "anon";

grant select on table "public"."partners" to "anon";

grant trigger on table "public"."partners" to "anon";

grant truncate on table "public"."partners" to "anon";

grant update on table "public"."partners" to "anon";

grant delete on table "public"."partners" to "authenticated";

grant insert on table "public"."partners" to "authenticated";

grant references on table "public"."partners" to "authenticated";

grant select on table "public"."partners" to "authenticated";

grant trigger on table "public"."partners" to "authenticated";

grant truncate on table "public"."partners" to "authenticated";

grant update on table "public"."partners" to "authenticated";

grant delete on table "public"."partners" to "service_role";

grant insert on table "public"."partners" to "service_role";

grant references on table "public"."partners" to "service_role";

grant select on table "public"."partners" to "service_role";

grant trigger on table "public"."partners" to "service_role";

grant truncate on table "public"."partners" to "service_role";

grant update on table "public"."partners" to "service_role";

grant delete on table "public"."rules" to "anon";

grant insert on table "public"."rules" to "anon";

grant references on table "public"."rules" to "anon";

grant select on table "public"."rules" to "anon";

grant trigger on table "public"."rules" to "anon";

grant truncate on table "public"."rules" to "anon";

grant update on table "public"."rules" to "anon";

grant delete on table "public"."rules" to "authenticated";

grant insert on table "public"."rules" to "authenticated";

grant references on table "public"."rules" to "authenticated";

grant select on table "public"."rules" to "authenticated";

grant trigger on table "public"."rules" to "authenticated";

grant truncate on table "public"."rules" to "authenticated";

grant update on table "public"."rules" to "authenticated";

grant delete on table "public"."rules" to "service_role";

grant insert on table "public"."rules" to "service_role";

grant references on table "public"."rules" to "service_role";

grant select on table "public"."rules" to "service_role";

grant trigger on table "public"."rules" to "service_role";

grant truncate on table "public"."rules" to "service_role";

grant update on table "public"."rules" to "service_role";

grant delete on table "public"."sources" to "anon";

grant insert on table "public"."sources" to "anon";

grant references on table "public"."sources" to "anon";

grant select on table "public"."sources" to "anon";

grant trigger on table "public"."sources" to "anon";

grant truncate on table "public"."sources" to "anon";

grant update on table "public"."sources" to "anon";

grant delete on table "public"."sources" to "authenticated";

grant insert on table "public"."sources" to "authenticated";

grant references on table "public"."sources" to "authenticated";

grant select on table "public"."sources" to "authenticated";

grant trigger on table "public"."sources" to "authenticated";

grant truncate on table "public"."sources" to "authenticated";

grant update on table "public"."sources" to "authenticated";

grant delete on table "public"."sources" to "service_role";

grant insert on table "public"."sources" to "service_role";

grant references on table "public"."sources" to "service_role";

grant select on table "public"."sources" to "service_role";

grant trigger on table "public"."sources" to "service_role";

grant truncate on table "public"."sources" to "service_role";

grant update on table "public"."sources" to "service_role";

grant delete on table "public"."triggers" to "anon";

grant insert on table "public"."triggers" to "anon";

grant references on table "public"."triggers" to "anon";

grant select on table "public"."triggers" to "anon";

grant trigger on table "public"."triggers" to "anon";

grant truncate on table "public"."triggers" to "anon";

grant update on table "public"."triggers" to "anon";

grant delete on table "public"."triggers" to "authenticated";

grant insert on table "public"."triggers" to "authenticated";

grant references on table "public"."triggers" to "authenticated";

grant select on table "public"."triggers" to "authenticated";

grant trigger on table "public"."triggers" to "authenticated";

grant truncate on table "public"."triggers" to "authenticated";

grant update on table "public"."triggers" to "authenticated";

grant delete on table "public"."triggers" to "service_role";

grant insert on table "public"."triggers" to "service_role";

grant references on table "public"."triggers" to "service_role";

grant select on table "public"."triggers" to "service_role";

grant trigger on table "public"."triggers" to "service_role";

grant truncate on table "public"."triggers" to "service_role";

grant update on table "public"."triggers" to "service_role";

create policy "audit_logs_partner_isolation"
on "public"."audit_logs"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "clicks_partner_isolation"
on "public"."clicks"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "consents_partner_isolation"
on "public"."consents"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "conversions_partner_isolation"
on "public"."conversions"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "events_partner_isolation"
on "public"."events"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "campaigns_partner_isolation"
on "public"."link_campaigns"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "links_partner_isolation"
on "public"."links"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "templates_partner_isolation"
on "public"."message_templates"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "messages_partner_isolation"
on "public"."messages"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "partners_own_data"
on "public"."partners"
as permissive
for all
to public
using (((auth.uid())::text = (id)::text));


create policy "rules_partner_isolation"
on "public"."rules"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "sources_partner_isolation"
on "public"."sources"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


create policy "triggers_partner_isolation"
on "public"."triggers"
as permissive
for all
to public
using ((partner_id IN ( SELECT partners.id
   FROM partners
  WHERE ((auth.uid())::text = (partners.id)::text))));


CREATE TRIGGER update_consents_updated_at BEFORE UPDATE ON public.consents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_link_campaigns_updated_at BEFORE UPDATE ON public.link_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_links_updated_at BEFORE UPDATE ON public.links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON public.message_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rules_updated_at BEFORE UPDATE ON public.rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sources_updated_at BEFORE UPDATE ON public.sources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


