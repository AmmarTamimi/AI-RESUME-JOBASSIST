// // types/database.types.ts
// //
// // Hand-written type mirror of the Supabase schema (resume_builder_schema.sql).
// // Pass this to createBrowserClient<Database>(...) / createServerClient<Database>(...)
// // in your client.ts / server.ts for fully typed queries.
// //
// // If you'd rather auto-generate this from the live DB instead of maintaining
// // it by hand, run:
// //   npx supabase gen types typescript --project-id <your-project-ref> > types/database.types.ts

// import type {
//   ResumeTheme,
//   ResumeContent,
//   TemplateLayout,
//   TemplateLayoutConfig,
// } from '@/app/types/Content'; // adjust path if your Content.ts lives elsewhere

// export interface Database {
//   public: {
//     Tables: {
//       templates: {
//         Row: {
//           id: string;
//           name: string;
//           category: string;
//           thumbnail: string;
//           component: string;
//           layout: TemplateLayout;
//           default_theme: ResumeTheme;
//           allowed_fonts: string[];
//           layout_config: TemplateLayoutConfig | null;
//           created_at: string;
//         };
//         Insert: {
//           id: string;
//           name: string;
//           category: string;
//           thumbnail: string;
//           component: string;
//           layout: TemplateLayout;
//           default_theme: ResumeTheme;
//           allowed_fonts?: string[];
//           layout_config?: TemplateLayoutConfig | null;
//           created_at?: string;
//         };
//         Update: Partial<Database['public']['Tables']['templates']['Insert']>;
//       };
//       resumes: {
//         Row: {
//           id: string;
//           user_id: string;
//           title: string | null;
//           template_id: string | null;
//           theme: ResumeTheme;
//           content: ResumeContent;
//           created_at: string;
//           updated_at: string;
//         };
//         Insert: {
//           id?: string;
//           user_id: string;
//           title?: string | null;
//           template_id?: string | null;
//           theme: ResumeTheme;
//           content: ResumeContent;
//           created_at?: string;
//           updated_at?: string;
//         };
//         Update: Partial<Omit<Database['public']['Tables']['resumes']['Insert'], 'user_id'>>;
//       };
//     };
//   };
// }




































// app/types/database.types.ts
//
// Hand-written type mirror of the Supabase schema (resume_builder_schema.sql).
// Pass this to createBrowserClient<Database>(...) / createServerClient<Database>(...)
// in your client.ts / server.ts for fully typed queries.
//
// IMPORTANT: @supabase/supabase-js's query builder requires every schema to
// declare Tables, Views, Functions, Enums, and CompositeTypes (even empty) to
// correctly infer types for .insert()/.update()/etc. Omitting any of them can
// cause those methods to silently type their argument as `never`.
//
// If you'd rather auto-generate this from the live DB instead of maintaining
// it by hand, run:
//   npx supabase gen types typescript --project-id <your-project-ref> > app/types/database.types.ts

import type {
  ResumeTheme,
  ResumeContent,
  TemplateLayout,
  TemplateLayoutConfig,
} from '@/app/types/Content';

export interface Database {
  public: {
    Tables: {
      templates: {
        Row: {
          id: string;
          name: string;
          category: string;
          thumbnail: string;
          component: string;
          layout: TemplateLayout;
          default_theme: ResumeTheme;
          allowed_fonts: string[];
          layout_config: TemplateLayoutConfig | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          category: string;
          thumbnail: string;
          component: string;
          layout: TemplateLayout;
          default_theme: ResumeTheme;
          allowed_fonts?: string[];
          layout_config?: TemplateLayoutConfig | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['templates']['Insert']>;
        Relationships: [];
      };
      resumes: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          template_id: string | null;
          theme: ResumeTheme;
          content: ResumeContent;
          created_at: string;
          updated_at: string;
          thumbnail_url: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          template_id?: string | null;
          theme: ResumeTheme;
          content: ResumeContent;
          created_at?: string;
          updated_at?: string;
          thumbnail_url?: string | null;
        };
        Update: Partial<Omit<Database['public']['Tables']['resumes']['Insert'], 'user_id'>>;
        Relationships: [
          {
            foreignKeyName: 'resumes_template_id_fkey';
            columns: ['template_id'];
            referencedRelation: 'templates';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}