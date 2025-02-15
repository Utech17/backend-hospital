enum concept_t {
  type1 = "type1",
  type2 = "type2",
  type3 = "type3",
}

export interface ConceptInterface{
  id?: number;
  name: string;
  concept_type: concept_t;
  formula: number;
  description: string;
}