export interface TermsSection {
  title: string;
  items: string[];
}

export interface TermsContent {
  id: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: TermsSection[];
}
