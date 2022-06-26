import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { artListModel, getArtList } from "./utils/request";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";

import { base64Encode } from "@core/shared";
import { Empty } from "@core/rc-components";

const rightArrowSrc =
  "data:image/png;base64,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";
const closeSrc =
  "data:image/png;base64,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";
const askSrc = `data:image/
  png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAHTJJREFUeF7tXQvUtuWU3pc1B1Y0ZciSKBrkMB
  ULHVDRVCJEIaIDytDBMDQlCaUaw1Aqh0YHJUOZDqjpR2UoHYxRqWY6jRSGjExYMgfXrOv/7y/v//3f9/3v3vf9PO/9vO+913rX+/V37/uwn+d679Pe14Y1aRZoFljUAmi2aRZoFljcAg0g7e1oFljCAg0g7fVoFmgAae9As0DMAm0Gidmtac2IBRpAZuRBt2HGLNAAErNb05oRCzSAzMiDbsOMWaABJGa3pjUjFmgAmZEH3YYZs0ADSMxuTWtGLNAA0vODJvlHZrbURz36r8U+APT/mvRkgQaQDgxN8lFm9lgze9wC3yVavMnMbjazlb4BfL9E5a2O31mgASTzbSD5BDPbwsy2MrOnJkDcP7PaqPq9CTjfNrN/MrNvArgxWlnTM2sAcbwFJPXiP83Mnm5mmyVQPNxRxSSK/iiB5Uozu9rMvgVAQGoyhgUaQFZjJJIPMbOXmNnOaaZYewy71lzkbs0sZnaumZ0D4Kc1d3bSfWsAWeQJkHx+AoXAIZBMowgc5wgsAC6YxgHmjqkBZMSCJDcZAYX+niW5ZgQs+ruJtT3I8peA5MvN7DVmtlN7K5Zb4ItmdjqAz826PWZ2BiH5QDPbI3204W6yqgW0sf+UPgB+OYsGmjmAkNxgBBgbzuJDD4z51hGgfC+gP1iVmQEIyaeY2d4JHLrJbuK3gG7xNaOcAuBf/OrD05h6gJC8n5kdbGaHmJmWVU3yLaDl1tFmdgyA3+ZXV28NUw0Qki9IwHhmvY9g0D27TEAB8KVBj2KJzk8lQEg+Ms0ab6rgwf3KzG4ws+tHvnVZ92sz0422vkc/6vID5n10g69/0yXlk8zsiSPfa1QwxhPTbHJHBX0p2oWpAwjJfdOsoc1436KLt6+nm+rlgADQ6aY2HTrMAUY+Yc+e0MWmxqnZ5BN9G73L9qYGICQ3MrOjkltIlzYbrVu/mALE5WZ2GYDv9NXwUu2Q3NTMtKzcMgFGM2pfopv5dwD4174a7LKdqQAISd1nCByP6NJYqe5rzex8M/sSgCt6aC+7CZKbm5n2Yy8ys42zK1x9BT9IINGJ16Bl0AAh+aB0mrJfx0/hdjP7gj4AlnXcVqfVk9zezF6YPut32pjZCVruAvhFx+10Vv1gAUJy2zRrPKMj6/yvmX1mBBhT5SKeXPfngPJKM/u9jux4VZpNvtpR/Z1WO0iAkNSdhpZUXYg22qea2WkAvttFA7XVSfLJZranme3V4QZf+xLdnQxKBgcQkmeZ2a4dWPkWgULgAHBnB/VXXyXJ9RJIBJY/6aDDZwN4WQf1dlbloABC8iIz0xq6pMhl4uQEjJl0yJtvzOTIqdnktWYmF52SsgzADiUr7LKuwQCEpKLgdBpTSrTHOCZdcOkyr8k8C5DUJaTcdPQpuUe5AoDubKqXQQCEpC7ddBlWSs5LwBjEMW2pQUfrScfEAsmLo3UsoKdLVHkFVC3VA4SkLuO0Ni4htyVgnFSislmrg+Q+aTZ5TKGx3wmgz0tMd7erBghJuVev6R7VwgofSeD4YaH6ZrIakusmkBxQyAD3AKg2/KBagJBkoQcgQBwE4NOF6mvVrAhT3t3M3m9mAky2AKjyXayyUyR/YmYPzba6mdywBQ550zYpbAGS2hcKJHJjyZW7AKyTW0lp/eoAQlKXcyU2b0cCOKy0wVp9q1qA5BFm9s4CtrkegC4tq5GqAELyEjPbJtM62ohr1vh8Zj1N3WEBkruk2SR3A38pgOc4mu60aDUAISmKmdxbVl367d74aDt9ZxatPPEUa6+Xe7l4FgBRMU1cqgBIIXDoInFnANq/NJmQBUhqHyFa09yLwCpAMnGAFALHJQCeO6F3ojW7gAVIXmxmuUuliYNkogAp5JV7IQDx6DapzAIkxfe7Y2a3JuoFPDGApHiOr2Qa7yMADsyso6l3aAGSx5lZ7qXinwGYSDzJRACSIgEFjpxgp6MAHNrhs21VF7IAyfcpaCqjOgVdCSS9RyZOCiDHm1lOmOxxAN6cYfCJqZLUMbboex488j36tzyL/9PMFLg1962/bwcwWNZ1kseaWc5sfwKA/ft+cL0DJBEsKDApKicDeF1UuW+9EYaR7cxMcRA56dkEGC01lF7tSgDf6ns8Oe2R/GSKMYlWsyeAXokgegVIoubR0irKPvI5AK+IWrcvPZJiD5Fr+LNSIs+umlbSTtnzzEmt0b0DI/lZM4vecYgtRUut3iiF+gbIP2TwVn1NtDUA7vE+lL7Kk9wt/UJqtuhblgMlgeU3fTc+bnsk5Z0t2qStx9WZV05p414a1HWr9QaQxHj4cXcPVyjIfWRHAEp7XJ2QVGiqPjVwAMtGmlHeU52hUodIKj32hWYWdUt5Q18Mjr0AJHHlat0cpQPdtUbfKpIiYfugpv0KX0ZliRInVZXMLMl36+yg3URzuhWAzrmA+wKICMSiRNJVeuWSVMo2nfGvFXzIfaj9RwKJaIyqk0wv4BMB5JyEjmWPzgGSUhDo1ywiovesLm8gyb8xs7dFBjQhnYkckY4zVpJ6N6LxJDt1nXqhU4Ck5DVaWkXW5ooE3K62YKeOqIfGeZdyy5wBQLNeVZKCrr4cjExUfhIttTpL4tM1QHR7qlvUiLy6tjBZkkea2ZBv7z8G4I2Rh9GlTgrfPSPYxqEAumLZtM4AknICavaIpD2rzscqpYrWGf7Q5YMAqlseZvhsiexPs0gnORO7BEjUSU1Hus8GUA37CEm5bct9u7SIEFsnMnMfsbjo6HPuI5eULuQIAO/qouJonYktRblWIke/nf2gdgKQlPVIyWQidC77AqiGtyoRO4toLvLg5r8vcg1Rsp2rzexbq7sRTi/N081s7lOSdnWH2lI5JN6tSIYq/bBs2kU2r64Aol+nyEXVeQB2jv4KdaFXwH9I3dItt9jio+vs5UMjqfsWEUu/usBYqwwyI6loxAiD4+EA3lvALitVURwgifhYs8eGzs6KK1dLq2roQEkq35/2UVH5kZntD0AuNsWE5NPM7HAzyz0C/0sAf1usYwUqSjSnWmp5uYBvTbNIUQLyLgCiC0FdDHqlugtBkkqgI/+qiGgpJfeYznzHSOpETSdrUVH8vn6UqnLhybhA3A+AMu4Wky4AohlgM2cPdQKhB1UNyzrJ5yV/IedQlhd/D4B3RxS9OplHpGrueAC5EX/ebi9ZPrHKaxbxsqMoBKBkBoCyx7wZR6EHAFAQVTVCUh6nSlHmlfcBKEGiNna7JBU89uGxFVYuWCWBNEkFR4lP2SuvACAKqSJSdAYhqUSX3nWxMjs9BUDRtWOOdZK36b8F6jgfQGSDGWhqZRWSWlpELwFfDkCZu6qRtJfVysKb6eqLACI/bAuOvRhASG5iZpE84YcByFlHF3+oJN+eWAK9dW8NIGdT723vvvKJtE3L2wgb/sTpdRYaOEnNxKI19YqOfIuEJ5cEiNbcOlnxiGKtNXtUlROQ5KWBgJ5jAfyFZ/Cly2a4wvw3gD8s3Z/c+lLORM0iD3HW9e5S8TAlAaLZQ7OIRz4AQL/W1Ui6nFNop0cUKy6gdx6fsFSnMpaGqra6i0N1Kug5fQ2ATT0PcLGyRQBCUsRtSjXgEd176KWqKqCHpGIMvAcGpwBQROHEJYMAfA8Ap098APM6kDwZNIt470VeAEDEdVlSCiByD1B6Lo+cDmAPj0IfZUnKzeX1zra2ByCX7YkLSVHriGLHK28H8AGvUh/lSYrJxOuqfxKAfXP7lw0Qklof3hhYJ1Z3ciJjBn6BbwagGOsqhKTI+K4MdKa65e7cGEiK9d97dKv97RMA6DssJQCimcPrYHa7mW0EQN6sVQlJHRh4aImqmglJyqlSbhdeqWoco50nKS4xUf2s7xxUtuNrCYBo7+Elj67u9nbk18qbG7GqY2qS8qD+ufNFUvFlAERsV6WQ1KWhl1nxAgDRcN7ldsgCCMkHmJniNrzEBbWemGi5eJfzDXktgFOcOp0VJ/kHZhbhxSp6wVZ6gCTl6n+Rs179UKwL4NdOvfuK5wJk2+TK7Wn/WgDe42BP/eGyJOVD5qXrv7ymuIpEsSTGRa9UGbM+b6mlyz9RLXkkixk+FyCRmPPqvHY91q69bHKFV0CWV6pd9s4NJOjlmxWzngsQRdqJh9YjWwJQurQmHVggg2ap+h8ukkrrpjACj2T5x+UC5Mdm5slt/UMAnhMijyFa2RXH1LqwFIu6V14FQPEvVQtJeTms6+jkTwA8zFF+paJhgCTaTa9D2LkAXhLtbNNbvQVIRpa9qnhjANetvoXJliB5jpK1OnuxCYBrnTrLi+cA5M/N7KPORsUVe4xTpxV3WICkyNS2dKioqDI3rQ3g/5x6vRcnebCZHe1s+I0APubUyQZI5Pp/MwBKp9WkAwuQ1OwciX+/DIBymVQvQU+B8CVozgyiKetPHRb9GYA/dpRvRZ0WIBnNv/IWANGIRGcv84uTlPe00taNK9cB8B4PZ88gunzxpBPLOk0Y1xKzWo6kllVaXnlFBy3af4jAYRBC0nt6ei8AXWq7JTSDkHyUkko6WzsIgFjRm3RgAZJ/b2aR9HQfAvDWDrrUWZXBiM/1AbgvUKMAidygF/HP78zqA66Y5MlmtndgCIrJ0b7w2wHdiakE449CN+pRgIgcwMs/9OguqCEn9pQqaZhkTkrtDwN4SyVDGbsbidr238dWWFHwTQC8p66xY16SYuPzGPZXACIs704bzFZxkjoy/6vgqLXR1ewRcY0PNllOjaRYcNZw1BhaSkZnEG9WoKsBKJCnSQELkHyQmYmHNockohixQYEhuasgqesCkXqPK6FsZVGAiDPKE0V3KoDIGnncwc9MOZLyNhY4xM8blUsBKKXDYIWkQgz2cgzgJgCPd5RfXjQKEG9QUTvB8j6ZeeVJirRAwDgksyqpPweAqI0GK5GTLADu992tEIxYaydYGa9iSuCjdBJim8+V3niDczu6lH7wJGstAMolMrZEABK5A2ku7mM/kpULkjzIzP46qD5fbZCnVguNPej67r4LiQBE7iVez0jxX0VoSQu9F8OrJh1lChgvL9T7iTM/FhrH8mpIihjOm5fQ7bEcAYic2kRN7xHRr4iVoskYFiC5i5npCNdL3LxY7QcCiDClj9HbyRQhuVGim/J0QCk2vuFRiABELBE65vXIBgC8rime+qemLEmlzVZMRynZFkAXCUhL9S9UD0lRACn5qUd2AuBiAI0A5FVm9mlPr8zsYUNyhnOOrUjxRLEpXzUl7ikhCmZ7HYB/LlFZbXWQVCSrHC09sjuAMz0KEYBE3EzWBKCgnCYLWICkllL/GMjruJg95QYkvq6fTavB02WpN72d290kApBIRNfvA5BjXJN5FkiJYrT89MQ3LGZH+ScJGN4ZfnDPJd0L/Y+z4+6I1gYQp4VLFyfpvXRdrAunptyI3nV56SH1Ul/NAGlLrEKvAEn90mtPlyMChC7/BJCZkZqXWG2TXuA1zMgGNdr6TM0aowOveZPejnkzAZJB7jbX8kzOGvMAUu0xb7sozABIWjsr0adYAiNyvW7XAdwQUZ4WnZovCpurScZbRjKS7HSuxSsBbJ7R/NSo1uxq0pwVM14zkkrVLBZ5r9wGYEOv0rSWr9lZMZKgpbm7r3CwEzAEkIhsBcDrAxdpZxA61bq7y3qBs/sWMLXCbtHl1VEADh3Em9tTJ6sNmEoAaSG3gReBpNxJvGnO5NKt2UMkBU2SBWoPuW2kDYFXlaSi2dZ0qrbZYwGD1U7a0Gh/nG85yaeaWcSztgWbLQyQqml/Iu4mM00cR3IbM7vEiatfAhDFT5MRCwyBOK5Rjzpf2SBAbgHwWGdTU188eILVK/Vo5C5kpk+yggD5OoCtpv6Ndw4wcoJlZm7CBnXL7e4+NxaS3vQH5wB4qdMWU1M8CJCzAJQibZgmW3rzoPSb/iAd9XoT6PwUwEOn5ik5BxIEyEcAHOhsauqLk7zLzB7iGOhEEujI1XpPRydVdGZPZIIAmQqSN+c7smTxoA/WaQA8NKX39SFniRVJN7w/gBNKGmwodTWAlHlSJPczM6V88IjIK5RDxS05AHmCmXldrs8EsLu7l1Og0ABS5iEGozCfCODGSA/CAEn7kB+a2cMdDd8BQCdgMycNIGUeOUmlUXuko7YfAVjXUX6lorkAieTF2wJA1KM1Os6J6zWA5D8CkoqF+aazps8C2M2pk78HSTOIskzJ7cQjRwI4zKPQyjYLpPftCDN7p9MabwXwIadOMYBEwm+vBbBJtMNNb3YtQFJskd58524+3lEL5y6xlCdd+5C1nY9tBwDLnDqt+AxbgOT2ZnaR0wR3m9m6AO516pWZQdK0JzLg5zs7cDyAA5w6rfgMW4Ck2On3d5rgAgBi4QlL1gySALKPmX3C2QNRbW6Ug2xne634gC1AUisVpc8Q1Y9H9gVwkkdhftkSANGVv86YPVf/6oeoa87K6XzTnQ0LkHyZmX3OOdqfmpny0ug7LNkASbOIZhDNJB45HcAeHoVWdjYtQPJTZvYa5+hPArCvU2eV4qUAoj2IKzGJmYntXb5Z380dRNOfXgukvCmKy1eWX48UYdIpApA0iygHoff49gMA3u4ZdSs7WxYgqaRCb3OO+hoAymGYLSUBEqG00fpQs8id2SNpFUydBUiulxJ1eve37wagtNnZUhIgmj0imWyV8OXI7JG0CqbOAiR1a67bc69sCkCXitlSDCBpmfUFM9vJ2atb0izSeJ+chpvm4inzlvYe3ky/XwTwwlK2KQ0QhYd+NtC5AwB4ffwDzTSVoViApC4FI6mrXwHAeyS8qFmKAiTNIhFyZv1SyGfmV0N5gK2f3VmA5BpmJh7ipzhbKc5+3wVA3mRmkajB5uXrfBumtTjJiNeuzLEfAGX4LSZdAOSBabPuperXvYhmkZmLFSn2NKegohTzodnDe+9xq5lpc150L1scIGmZ9S4llgw8r/MA7BzQG6RK8jF6jJndz8y+V/rhDtEoJM81sxcH+n44gPcG9JZU6QogG6RZRLlEvJLtYOZtsO/yyTP1OWb2pHlt32Zm15nZO2YxxRrJiOOrTChScM0exVNgdwKQNIscZ2YRl3a9JFpqKc5kqoTkE83sQjMbJy7/9QA+OVUGWGIwJBU3rqWVZlSvdMYf1iVAdAKhZJXak3ilswF7O1KqfFpOiY3SI5sDuNKjMNSyJKM/qNpzKH+KTkKLS2cASbPIO8zsfcFevxrAp4O61amR1OmKWPE98mMzWw+ADjCmVkiKCuqM4AAPBXBUUHe1al0DRJtPzSLPXG1PVi2gJdZ207AWJylXbblsR+SDALzOepF2JqKTlp1fVmhsoAOXpdnjtwHdsVQ6BUiaRRTyqIxUEfkSAK/rSqSdTnVI6mZXQT8RuROAhwcq0sbEdEh6s5WN9nUnAN4wC9dYOwdIAokuDnWBGJHBXyCSvENLpcjgk84mAEQWPlWScSEoO5wIQDSknUpfANEvoJZaOv6NyK4APh9RnLQOSTnb3ZzZj30A/F1mHVWpk9zFzM4OdkrHudqY64enU+kFIGkWUfjjx4Oj0dGvptMQv2qwzSJqaY19fWZlewMQm/5UCEnxOmtpFTnSlQ3eAMBLFBKyXW8ASSDxJj4ZHZSO8Z4H4CehkU5IKXi8O7+3YfLlCQ170WZJrmNmSoftdUScq7PXREx9A2QjM/uKmT0i+OC+CWDLoO7E1Egq7n7+rfm4/ZELyqPHLVx7OZKXm9kWwX7+wMyUa1AUQL1IrwBJs4iYTE7LGN0lAJ6bod+7KsljzSyaKeqjAKIHHL2PdakGSV5sZnKxicqeAKLH5aE2ewdIAomCo3JOIC4E4GVzDBmolBJJ7Z80g3rkHjNbB8BvPEo1liV5gZntmNG3EwB4mRUzmluhOimAKPe3llrPyBjBoNxRgrm9dwMQidDMMGt51Qw3krnOXJWWVr8o37ula5wIQNIsEsm1Pn80RwE4tG+jRdsjqSSmZ+phr6YOuZi8eBr8sEjK1UguRzkSynGe0+Cc7sQAkkByiJnl+tEcB+DNJYzRVx0ktafQckHHnaMi+iPNGAdPg/9V5t5rzi5y/T+6r2czv52JAiSBRPy8u2Ya4GQAr8uso3d1ko9PfmryWbtqmm7LScpVX4lec+RsAFEXnZx279OdOEASSJT3QfkfckT+Trpx1sa2yYQsQHJNMxOjuhhucmQZgB1yKiihWwVAEkiUe0456HLka2amiMSbcippujELkHxcSoWxdayG+7SuABC9K8lsemX1agCSQCKXDEXd5YjcUg4aqu9WzsAnqZt8q96f4T4y1/0bAEQvVYuboCqAJJDker7OGWnwXsDFn3ZHFWZ65Y72qjrX/uoAkkCiIHytZXNFsQKaTW7Irajpr2qB5IipWSMrzVmq+R4AEZKPTh9NlQBJIGGhkSsyUSCZmvDdQnbJqiaFyQockUjAVdoGUOW7WGWn5qxHUp67ulwrIeJ5PWYa2VJKGGfcOhL7yMFBxpqFmrkLgDx8q5SqAZJmkhxP2PlG1wZeIMlK7Fjlk+yhU4m3SuCIxnHM7+X1AJ7cQ9fDTVQPkASSS8xsm/AoV1U8LwGl0ZyOYdREBypgRBgPF2vhUgA5nr1j9Dy/yCAAkkCSQ3ywkKVEpXNMAkpjlV/AQollXcDQx8uVu9TbeRaA3IvE/Ld/jBoGA5COQKJqFal4spmd2rhxV7wxKXnNXslVJBr5t9jrNxhwaACDAkiHIFHVynSlQC4BZSZzJqacgALGnoHMTmP8HtugwDFIgCSQlPACXuyBKrGoCBJOm5UU1SnVskAhcHgTZo4DDJWZqFfuuJ2cX25wM8jcAEgqn
  kSu8jlBV0vZTXuUz5iZ8i5+AcC9USPXqJfIJJTLT59XFt5jjA5ZwU4Cx1drtMPq+jRYgKSZRJGJihXICd9dnY30/28fAcqycRRqLUNSXtNzwFi/43
  6KMPAQAL1HApYa16ABMjKbiAhCs0mULcVjTzEcnm9mFwCQB3L1QlKesYrhf5GZbdxDh8U+olmjV4KFLsY1FQBJs4kIEQSSl3RhqEXqlBuLlhBKU
  XAxAP09cSGpZaeYXzZLS9Ai7iBjDuycBI7eqHnG7Feo2NQAZGQ2EYOjNvFRmtOQIZPSz8zsG+kj1325bhfPejTawUQGoRABuYg/K30enDOIoK7GeXR
  fjIfBPrrVpg4gaTYRF7Aut2rgk9IlpLyJlwMmfd9tZkqmo42/vkc/GsID5n3un/577QSEOUDoWymTJy3KfSIXns65cvse6FQCZGQ2kRu2ZpNIfpK+n8U
  Q21N+Ds0anaYgmKRhphogaTYRIYJmEwElkg5uks+n1raV9kynh5o1OkteU8Pgpx4gI7OJXCb2NjOdeFUXmFPDyzBGHxTIppOpU7rKCThGH3otMjMAGQG
  KNu8CiT4b9mrt4TZ2awLGp7o+dKjNRDMHkBGgaLk1BxQdhzZZ1QI6vtaMIWBoWTVzMrMAGX3SJOV6rUSbg8+HWOgNVnKb0wEoxGCmpQFk5PGT3CRdNO5sZvp7luQaMzvXzJSgRn83GaK7e19PjaRcMwQU3cx35eHa13AWa0eey7r5PheA0hM0mWeBNoOs5pUgKXAIJAKLslutNfC36OdmpixPc7OFQNJkEQs0gDheDZK64RZItKnXR1Sp1TJypKGJGUax99pw63M5AN3cNxnDAg0gYxhpqSIk5R0r0OizqZk91szkGjIJkeuKUk5/J80SAsPU5Vfv07ANIB1Ym+SjElBE5izAjH6XaFHk3ALCSt8Avl+i8lbH7yzQANLz20BSt/hLfdQj3Vgv+AGgf2/SkwUaQHoydGtmmBZoABnmc2u97skCDS
  A9Gbo1M0wLNIAM87m1XvdkgQaQngzdmhmmBRpAhvncWq97skADSE+Gbs0M0wINIMN8bq3XPVmgAaQnQ7dmhmmBBpBhPrfW654s0ADSk6FbM8O0QAPIMJ9b63VPFvh/3a9xUBtWddcAAAAASUVORK5CYII=
`;
export default function App({
  systemId,
  categoryId,
  platformCode = "1",
  baseURL = "",
  httpError,
}: {
  systemId: string;
  categoryId: string;
  platformCode: string;
  baseURL: string;
  httpError: (code?: number, data?: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [artList, setArtList] = useState<artListModel.Datum[]>([]);
  const width = document.body.clientWidth > 700 ? 654 : 300;

  const initArtList = () => {
    getArtList(baseURL, {
      categoryId,
      channel: 1,
      platformCode,
      systemId,
    }).then(
      (data) => {
        setArtList(data || []);
      },
      (e) => {
        setArtList([]);
        httpError(500, e);
      }
    );
  };

  const handleClick = useCallback(() => {
    if (!open) {
      initArtList();
    }
    setOpen((flag) => !flag);
  }, [open, categoryId]);
  const openDt = useCallback((path: string) => {
    if (path) {
      let _href = "";
      const { hostname, href, origin } = window.location;
      if (hostname === "localhost") {
        _href = "http://ymsl.kxgcc.com:30872";
      } else {
        _href = origin;
      }
      window.open(
        `${_href}/cms-static/${path}?busCode=cms1010&info=${base64Encode(
          sessionStorage.getItem("USER_INFO") || ""
        )}`
      );
    }
  }, []);
  const afterVisibleChange = (flag: boolean) => {
    if (!flag) {
      setArtList([]);
    }
  };
  const resizeHandle = useCallback(() => {
    setOpen(false);
    setArtList([]);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", resizeHandle);
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, []);

  return (
    <Drawer
      level={null}
      width={width}
      maskClosable={true}
      onClose={() => setOpen(false)}
      afterVisibleChange={afterVisibleChange}
      handler={
        open ? (
          false
        ) : (
          <div
            className="BlockStyle drawer-handle1"
            onClick={() => handleClick()}
          >
            <div className="BlockSpanStyle">帮助中心</div>
            <div className="BlockIconStyle">
              <img
                className="HandleImg"
                width="24px"
                height="24px"
                src={askSrc}
              />
            </div>
          </div>
        )
      }
      open={open}
      placement="right"
    >
      <div className="BannerLine">
        <div className="BzzxText">帮助中心</div>
        <div className="CloseImgWrap" onClick={() => setOpen(false)}>
          <img
            className="ArtRightArrow"
            src={closeSrc}
            alt="close"
            width="16px"
            height="16px"
          />
        </div>
      </div>

      <div className="ArtItemWrap">
        {!artList || !artList.length ? (
          <div style={{ height: "500px" }}>
            <Empty imgWidth="170px" />
          </div>
        ) : (
          <div>
            {(artList || []).map((art, index) => {
              return (
                <div
                  className="ArtItem"
                  key={art.title + art.id}
                  onClick={() => openDt(art.path)}
                >
                  <div className="ArtItemTitle">{art.title}</div>
                  <img
                    className="ArtRightArrow"
                    alt="arrow"
                    src={rightArrowSrc}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Drawer>
  );
}
