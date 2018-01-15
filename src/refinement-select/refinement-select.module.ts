import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisRefinementSelect } from "./refinement-select";

@NgModule({
  declarations: [NgAisRefinementSelect],
  entryComponents: [NgAisRefinementSelect],
  exports: [NgAisRefinementSelect],
  imports: [
    CommonModule,
    NgAisHeaderModule,
    NgAisFooterModule,
    NgAisHighlightModule
  ]
})
export class NgAisRefinementSelectModule {}
