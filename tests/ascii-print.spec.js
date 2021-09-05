const { figletFmtStr } = require("../lib/ascii-print");

describe("#figletFmtStr", () => {
  it("Returns text in figlet default font", async () => {
    const result = await figletFmtStr("hello", "alligator2");
    const expectedResult = `
:::    ::: :::::::::: :::        :::         ::::::::  
:+:    :+: :+:        :+:        :+:        :+:    :+: 
+:+    +:+ +:+        +:+        +:+        +:+    +:+ 
+#++:++#++ +#++:++#   +#+        +#+        +#+    +:+ 
+#+    +#+ +#+        +#+        +#+        +#+    +#+ 
#+#    #+# #+#        #+#        #+#        #+#    #+# 
###    ### ########## ########## ##########  ########  
    `.trim();
    expect(result.trim()).toEqual(expectedResult);
  });
});
