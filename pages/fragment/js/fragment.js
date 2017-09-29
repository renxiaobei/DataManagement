// 自适应程序
var zidingyi_height;
$(document).ready(function(){
           var header=$(".content-header").height();
          var mainheader=$(".main-header").height();
          var footer=$(".main-footer").height();
          zidingyi_height=window.innerHeight-footer-header-mainheader;
           console.log(zidingyi_height);
           $("#fragmentClassDiv").css("height",zidingyi_height*0.85+"px");
           $("#fragmentUnaddDiv").css("height",zidingyi_height*0.85+"px");
           $("#fragmentAddDiv").css("height",zidingyi_height*0.2+"px");
           $("#fragmentTreeDiv").css("height",zidingyi_height*0.54+"px");
           $("#fragmentInfoDiv").css("height",zidingyi_height*0.85+"px");
})

var editor = new wangEditor('wang');
editor.config.uploadImgUrl = ip+'/SpiderAPI/createImageFragment';
editor.config.uploadImgFileName="imageContent";
editor.config.hideLinkImg = true;
editor.create();


/*function addFrag(){
    console.log("success");
    var html = editor.$txt.html();
    console.log(html);
//    document.getElementById("test").innerHTML=html;
}*/

var nowOperateClass;
var nowOperateTopic;
var nowOperateFacet1;
var nowOperateFacet2;


var app=angular.module('myApp',[
    'ui.bootstrap'
    ]);
app.controller('myCon',function($scope,$http,$sce){
    $http.get(ip+'/DomainAPI/getDomain').success(function(response){
        $scope.subjects=response;
//        $scope.getTopic(getCookie("NowClass"));
        $("#class_name").text(nowOperateClass);
        if(getCookie("NowFacetLayer")==1){
            $scope.getfacet1fragment(getCookie("NowClass"),getCookie("NowTopic"),getCookie("NowFacet"));

        }else if(getCookie("NowFacetLayer")==2){
            $scope.getfacet2fragment(getCookie("NowClass"),getCookie("NowTopic"),getCookie("NowFacet1"),getCookie("NowFacet"));

        }else{
            $scope.getfacet3(getCookie("NowClass"),getCookie("NowTopic"),getCookie("NowFacet"));

        }
    });

    $http.get(ip+'/SpiderAPI/getFragment').success(function(response){
        //console.log(response);
        $scope.unaddfragments=response;
        for(var i=0;i<$scope.unaddfragments.length;i++){
            $scope.unaddfragments[i].FragmentContent=$sce.trustAsHtml($scope.unaddfragments[i].FragmentContent);
        }
        
        
    });

    $scope.isCollapsed = true;
    $scope.isCollapsedchildren = true;
    $scope.isCollapsedchildren2=true;


    $scope.addFrag=function(){
        console.log("success");
        var html = editor.$txt.html();

        $http({
            method:'GET',
            url:ip+"/SpiderAPI/createFragment",
            params:{FragmentContent:html}
        }).then(function successCallback(response){
            alert("添加碎片成功");
        }, function errorCallback(response){

        });


        // $.ajax({
        //      type: "GET",
        //      url: ip+"/SpiderAPI/createFragment",
        //      data: {FragmentContent:html},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //         alert("添加碎片成功");
        //               }
        //  });
    }

    // $scope.dropFacet1=function(obj,id){
    //     console.log(obj);
    //     console.log(id);
    // }
    // $scope.dropFacet2=function(obj,id){
    //     console.log(obj);
    //     console.log(id);
    // }
    // $scope.dropFacet3=function(obj,id){
    //     console.log(obj);
    //     console.log(id);
    // }
    //杨宽添加,显示分面树函数
    $scope.showFacetTreeWithLeaves=function(className,subjectName){
        $.ajax({
         type: "GET",
         url: ip+"/AssembleAPI/getTreeByTopic",
         data: {
            ClassName:className,
            TermName:subjectName
         },
         dataType: "json",
         success: function(dataset){
                   displayTree(dataset);
                 },
         error:function(XMLHttpRequest, textStatus, errorThrown){
                //通常情况下textStatus和errorThrown只有其中一个包含信息
                alert(textStatus);
                }
        });
    }

    $scope.getInfo=function(){
        nowOperateClass=document.getElementById("nameofclass").value;

        $http({
            method:'GET',
            url:ip+"/FacetAPI/getDomainInfo",
            params:{ClassName:nowOperateClass}
        }).then(function successCallback(response){
            $scope.classInfo=response.data;
        }, function errorCallback(response){

        });


        // $.ajax({
        //      type: "GET",
        //      url: ip+"/FacetAPI/getDomainInfo",
        //      data: {ClassName:nowOperateClass},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  $scope.classInfo=data;
        //               }
        //  });
    }




    $scope.getTerm=function(){
        nowOperateClass=document.getElementById("nameofclass").value;

        $http({
            method:'GET',
            url:ip+"/SpiderAPI/getDomainTerm",
            params:{ClassName:nowOperateClass}
        }).then(function successCallback(response){
            for(var i=0;i<response.data.length;i++){

                $http({
                    method:'GET',
                    url:ip+"/DomainTopicAPI/getDomainTermInfo",
                    params:{ClassName:nowOperateClass,TermName:response.data[i].TermName}
                }).then(function successCallback(response1){
                    if(response1.data[0].FacetNum==0){
                         $("#"+response1.data[0].TermName+"_a").hide();
                     }
                }, function errorCallback(response1){

                });
            }
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/SpiderAPI/getDomainTerm",
        //      data: {ClassName:nowOperateClass},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  //$scope.topics=data;
        //                  for(var i=0;i<data.length;i++){
        //                     $.ajax({
        //                        type: "GET",
        //                        url: ip+"/DomainTopicAPI/getDomainTermInfo",
        //                        data: {ClassName:nowOperateClass,TermName:data[i].TermName},
        //                        dataType: "json",
        //         //             async:false,
        //                        success: function(data1){
        //                        if(data1[0].FacetNum==0){
        //                        $("#"+data1[0].TermName+"_a").hide();
        //                                                        }
        //                                                                   }
        //                      });
        //                 }
        //               }
        //  });
    }

    $scope.getTopic=function(a){
        nowOperateClass=a;

        $http({
            method:'GET',
            url:ip+"/SpiderAPI/getDomainTerm",
            params:{ClassName:nowOperateClass}
        }).then(function successCallback(response){
            $scope.topics=response.data;
            for(var i=0;i<response.data.length;i++){

                $http({
                    method:'GET',
                    url:ip+"/DomainTopicAPI/getDomainTermInfo",
                    params:{ClassName:nowOperateClass,TermName:response.data[i].TermName}
                }).then(function successCallback(response1){
                    if(response1.data[0].FacetNum==0){
                               $("#"+response1.data[0].TermName+"_a").hide();
                                                               }
                }, function errorCallback(response1){

                });
            }
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/SpiderAPI/getDomainTerm",
        //      data: {ClassName:nowOperateClass},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  $scope.topics=data;
        //                  for(var i=0;i<data.length;i++){
        //                     $.ajax({
        //                        type: "GET",
        //                        url: ip+"/DomainTopicAPI/getDomainTermInfo",
        //                        data: {ClassName:nowOperateClass,TermName:data[i].TermName},
        //                        dataType: "json",
        //         //             async:false,
        //                        success: function(data1){
        //                        if(data1[0].FacetNum==0){
        //                        $("#"+data1[0].TermName+"_a").hide();
        //                                                        }
        //                                                                   }
        //                      });
        //                 }
        //               }
        //  });
    }


    $scope.gettopichref=function(a,b){
        // $("#"+b+"_a").attr("href","#"+b+"_info");
        //nowOperateTopic=a;
        $http({
            method:'GET',
            url:ip+"/SpiderAPI/getDomainTermFacet1",
            params:{ClassName:a,TermName:b}
        }).then(function successCallback(response){
            for(var i=0;i<response.data.length;i++){

                $http({
                    method:'GET',
                    url:ip+"/FacetAPI/getFacet1Facet2Num",
                    params:{ClassName:a,TermName:b,Facet1Name:response.data[i].FacetName}
                }).then(function successCallback(response1){
                    if(response1.data.Facet2Num==0){
                               $("#"+b+"_"+response1.data.Facet1Name+"_a").hide();
                                                               }
                }, function errorCallback(response1){

                });
            }
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/SpiderAPI/getDomainTermFacet1",
        //      data: {ClassName:a,TermName:b},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  //$scope.facet1s=data;
        //                  for(var i=0;i<data.length;i++){
        //                     $.ajax({
        //                        type: "GET",
        //                        url:ip+"/FacetAPI/getFacet1Facet2Num",
        //                        data: {ClassName:a,TermName:b,Facet1Name:data[i].FacetName},
        //                        dataType: "json",
        //                        //async:false,
        //                        success: function(data1){
        //                         if(data1.Facet2Num==0){
        //                             $("#"+b+"_"+data1.Facet1Name+"_a").hide();
        //                         }
        //                     }
        //                 });
        //                  }
        //               }
        //  });

        
    }

    $scope.gettopicfragment=function(a,b){
        nowOperateClass=a;
        nowOperateTopic=b;

        $http({
            method:'GET',
            url:ip+"/SpiderAPI/getDomainTermFragment",
            params:{ClassName:a,TermName:b}
        }).then(function successCallback(response){
            $scope.fragments=response.data;
            for(var i=0;i<$scope.fragments.length;i++){
               $scope.fragments[i].FragmentContent=$sce.trustAsHtml($scope.fragments[i].FragmentContent);
           }
           $("#fragmenttopic").text("主题 "+b+" 下碎片");
           $("#topictree").text("主题 "+b+" 主题树");
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/SpiderAPI/getDomainTermFragment",
        //      data: {ClassName:a,TermName:b},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  $scope.fragments=data;
        //                  for(var i=0;i<$scope.fragments.length;i++){
        //                      $scope.fragments[i].FragmentContent=$sce.trustAsHtml($scope.fragments[i].FragmentContent);
        // }
        //                  $("#fragmenttopic").text("主题 "+b+" 下碎片");
        //                  $("#topictree").text("主题 "+b+" 主题树");
        //               }
        //  });
    }

    $scope.getfacet1href=function(a,b,c){
        //var name=b+c+"facet2s";
        // $("#"+b+"_"+c+"_a").attr("href","#"+b+"_"+c+"_info");
       // nowOperateFacet1=a;
        
        $http({
            method:'GET',
            url:ip+"/SpiderAPI/getDomainTermFacet2",
            params:{ClassName:a,TermName:b,Facet1Name:c}
        }).then(function successCallback(response){
            if(response.data.length!=0){
                for(var i=0;i<response.data.length;i++){

                $http({
                    method:'GET',
                    url:ip+"/FacetAPI/getFacet2Facet3Num",
                    params:{ClassName:a,TermName:b,Facet2Name:response.data[i].ChildFacet}
                }).then(function successCallback(response1){
                    if(response1.data.Facet3Num==0){
                               $("#"+b+"_"+c+"_"+response1.data.Facet2Name+"_a").hide();
                                                               }
                }, function errorCallback(response1){

                });
            }}else{
                    $("#"+b+"_"+c+"_info").remove();
                    
                }
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/SpiderAPI/getDomainTermFacet2",
        //      data: {ClassName:a,TermName:b,Facet1Name:c},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //         if(data.length!=0){
        //             //$scope.facet2s=data;
        //             for(var i=0;i<data.length;i++){
        //                 $.ajax({
        //                        type: "GET",
        //                        url: ip+"/FacetAPI/getFacet2Facet3Num",
        //                        data: {ClassName:a,TermName:b,Facet2Name:data[i].ChildFacet},
        //                        dataType: "json",
        //                        //async:false,
        //                        success: function(data1){
        //                         if(data1.Facet3Num==0){
        //                             $("#"+b+"_"+c+"_"+data1.Facet2Name+"_a").hide();
        //                         }
        //                     }
        //                 });
        //             }


        //         }else{
        //             $("#"+b+"_"+c+"_info").remove();
        //         }
                         
        //               }
        //  });

        
    }

    $scope.getfacet1fragment=function(a,b,c){
        nowOperateClass=a;
        nowOperateTopic=b;
        nowOperateFacet1=c;

        $http({
            method:'GET',
            url:ip+"/SpiderAPI/getDomainTermFacet1Fragment",
            params:{ClassName:a,TermName:b,FacetName:c}
        }).then(function successCallback(response){
            $scope.fragments=response.data;
            for(var i=0;i<$scope.fragments.length;i++){
               $scope.fragments[i].FragmentContent=$sce.trustAsHtml($scope.fragments[i].FragmentContent);
           }
           $("#fragmenttopic").text("一级分面 "+c+" 下碎片");
           $("#topictree").text("主题 "+b+" 主题树");
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/SpiderAPI/getDomainTermFacet1Fragment",
        //      data: {ClassName:a,TermName:b,FacetName:c},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //         console.log(data);
        //                  $scope.fragments=data;
        //                  for(var i=0;i<$scope.fragments.length;i++){
        //                      $scope.fragments[i].FragmentContent=$sce.trustAsHtml($scope.fragments[i].FragmentContent);
        // }
        //                  $("#fragmenttopic").text("一级分面 "+c+" 下碎片");
        //                  $("#topictree").text("主题 "+b+" 主题树");
        //               }
        //  });
    }

    $scope.getfacet2href=function(a,b,c,d){
        // $("#"+b+"_"+c+"_"+d+"_a").attr("href","#"+b+"_"+c+"_"+d+"_info");
        //nowOperateFacet2=a;
        $http({
            method:'GET',
            url:ip+"/SpiderAPI/getDomainTermFacet3",
            params:{ClassName:a,TermName:b,Facet2Name:d}
        }).then(function successCallback(response){
            if(response.data.length!=0){
                }else{
                    $("#"+b+"_"+c+"_"+d+"_info").remove();
                }
        }, function errorCallback(response){

        });

//         $.ajax({
//              type: "GET",
//              url: ip+"/SpiderAPI/getDomainTermFacet3",
//              data: {ClassName:a,TermName:b,Facet2Name:d},
//              dataType: "json",
//              async:false,
//              success: function(data){
// //                console.log(data);
//                          if(data.length!=0){
//                    // $scope.facet3s=data;
//                 }else{
//                     $("#"+b+"_"+c+"_"+d+"_info").remove();
//                 }
//                       }
//          });

        
    }
    $scope.getfacet2fragment=function(a,b,c,d){
        nowOperateClass=a;
        nowOperateTopic=b;
        nowOperateFacet1=c;
        nowOperateFacet2=d;

        $http({
            method:'GET',
            url:ip+"/SpiderAPI/getDomainTermFacet2Fragment",
            params:{ClassName:a,TermName:b,FacetName:d}
        }).then(function successCallback(response){
            $scope.fragments=response.data;
            for(var i=0;i<$scope.fragments.length;i++){
               $scope.fragments[i].FragmentContent=$sce.trustAsHtml($scope.fragments[i].FragmentContent);
           }
           $("#fragmenttopic").text("二级分面 "+d+" 下碎片");
           $("#topictree").text("主题 "+b+" 主题树");
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/SpiderAPI/getDomainTermFacet2Fragment",
        //      data: {ClassName:a,TermName:b,FacetName:d},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  $scope.fragments=data;
        //                  for(var i=0;i<$scope.fragments.length;i++){
        //                      $scope.fragments[i].FragmentContent=$sce.trustAsHtml($scope.fragments[i].FragmentContent);
        // }
        //                  $("#fragmenttopic").text("二级分面 "+d+" 下碎片");
        //                  $("#topictree").text("主题 "+b+" 主题树");
        //               }
        //  });
    }

    $scope.getfacet3=function(a,b,c){

        $http({
            method:'GET',
            url:ip+"/SpiderAPI/getDomainTermFacet3Fragment",
            params:{ClassName:a,TermName:b,FacetName:c}
        }).then(function successCallback(response){
            $scope.fragments=response.data;
            for(var i=0;i<$scope.fragments.length;i++){
               $scope.fragments[i].FragmentContent=$sce.trustAsHtml($scope.fragments[i].FragmentContent);
           }
           $("#fragmenttopic").text("三级分面 "+c+" 下碎片");
           $("#topictree").text("主题 "+b+" 主题树");
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/SpiderAPI/getDomainTermFacet3Fragment",
        //      data: {ClassName:a,TermName:b,FacetName:c},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  $scope.fragments=data;
        //                  for(var i=0;i<$scope.fragments.length;i++){
        //                      $scope.fragments[i].FragmentContent=$sce.trustAsHtml($scope.fragments[i].FragmentContent);
        // }
        //                  $("#fragmenttopic").text("三级分面 "+c+" 下碎片");
        //                  $("#topictree").text("主题 "+b+" 主题树");
        //               }
        //  });
    }

    $scope.deleteUnaddFragment=function(a){
        console.log(a);

        $http({
            method:'GET',
            url:ip+"/SpiderAPI/deleteUnaddFragment",
            params:{FragmentID:a}
        }).then(function successCallback(response){
            alert(response.data.success);
        }, function errorCallback(response){

        });
        
         //    $.ajax({
         //     type: "GET",
         //     url: ip+"/SpiderAPI/deleteUnaddFragment",
         //     data: {FragmentID:a},
         //     dataType: "json",
         //     success: function(data){
         //                 alert(data.success);
         //              }
         // });
        
        
        
    }

    $scope.deleteFragment=function(a){

        $http({
            method:'GET',
            url:ip+"/SpiderAPI/deleteFragment",
            params:{FragmentID:a}
        }).then(function successCallback(response){
            alert(response.data.success);
        }, function errorCallback(response){

        });

       
//             $.ajax({
//              type: "GET",
//              url: ip+"/SpiderAPI/deleteFragment",
//              data: {FragmentID:a},
//              dataType: "json",
// //             async:false,
//              success: function(data){
//                          alert(data.success);
//                       }
//          });
        
        
        
    }
});