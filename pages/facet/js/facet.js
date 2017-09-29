

// 自适应程序
var zidingyi_height;
$(document).ready(function(){
           var header=$(".content-header").height();
          var mainheader=$(".main-header").height();
          var footer=$(".main-footer").height();
          zidingyi_height=window.innerHeight-footer-header-mainheader;
           console.log(zidingyi_height);
           $("#facetClassDiv").css("height",zidingyi_height*0.98+"px");
           $("#facetAddDiv").css("height",zidingyi_height*0.2+"px");
           $("#facetTreeDiv").css("height",zidingyi_height*0.67+"px");
           $("#facetFacetDiv").css("height",zidingyi_height*0.67+"px");
           $("#facetInfoDiv").css("height",zidingyi_height*0.2+"px");
})



var nowOperateClass;
var nowOperateTopic;
var nowOperateFacet1;
var nowOperateFacet2;


var app=angular.module('myApp',[
    'ui.bootstrap'
]);
app.controller('myCon',function($scope,$http){
    $http.get(ip+'/DomainAPI/getDomain').success(function(response){
        $scope.subjects=response;
        $scope.getTopic(getCookie("NowClass"));
        $scope.gettopicfacet(getCookie("NowClass"),getCookie("NowTopic"));
        $scope.getfacetinfo(getCookie("NowFacet"),getCookie("NowFacetLayer"));
        $("#class_name").text(nowOperateClass);
    });

    $scope.isCollapsed = true;
    $scope.isCollapsedchildren = true;




    $scope.addFacet=function(){
    var nowtype=document.getElementById("nowtype").innerText;
    if(nowtype=="主题"){

        $http({
            method:'GET',
            url:ip+"/FacetAPI/createFacet1",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:$("input[name='FacetName']").val()}
        }).then(function successCallback(response){
            alert(response.data.success);            
            $scope.gettopicfacet(nowOperateClass,nowOperateTopic);
            $scope.getInfo();
            $scope.getTerm();
        }, function errorCallback(response){

        });
    }
    else if(nowtype=="一级分面"){

        $http({
            method:'GET',
            url:ip+"/FacetAPI/createFacet2",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,Facet1Name:nowOperateFacet1,Facet2Name:$("input[name='FacetName']").val()}
        }).then(function successCallback(response){
            alert(response.data.success);
            $scope.getfacet1facet(nowOperateClass,nowOperateTopic,nowOperateFacet1);
            $scope.getInfo();
            $scope.getTerm();
        }, function errorCallback(response){

        });
    }
    else{

        $http({
            method:'GET',
            url:ip+"/FacetAPI/createFacet3",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,Facet1Name:nowOperateFacet1,Facet2Name:nowOperateFacet2,Facet3Name:$("input[name='FacetName']").val()}
        }).then(function successCallback(response){
            alert(response.data.success);
            $scope.getfacet2facet(nowOperateClass,nowOperateTopic,nowOperateFacet1,nowOperateFacet2);
            $scope.getInfo();
            $scope.getTerm();
        }, function errorCallback(response){

        });
    }
    }


    $scope.updateFacet=function(){
    var name=document.getElementById("facet_name").innerText;
    var layer=document.getElementById("facet_layer").innerText;
    if(layer=="1"){

        $http({
            method:'GET',
            url:ip+"/FacetAPI/updataFacet1",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:name,NewFacetName:$("input[name='NewFacetName']").val()}
        }).then(function successCallback(response){
            alert(response.data.success);
            $scope.gettopicfacet(nowOperateClass,nowOperateTopic);
            $scope.getInfo();
            $scope.getTerm();
        }, function errorCallback(response){

        });

    }
    else if(layer=="2"){

        $http({
            method:'GET',
            url:ip+"/FacetAPI/updataFacet2",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:name,NewFacetName:$("input[name='NewFacetName']").val()}
        }).then(function successCallback(response){
            alert(response.data.success);
            $scope.gettopicfacet(nowOperateClass,nowOperateTopic);
            $scope.getInfo();
            $scope.getTerm();
        }, function errorCallback(response){

        });
    }
    else{

        $http({
            method:'GET',
            url:ip+"/FacetAPI/updataFacet3",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:name,NewFacetName:$("input[name='NewFacetName']").val()}
        }).then(function successCallback(response){
            alert(response.data.success);
            $scope.gettopicfacet(nowOperateClass,nowOperateTopic);
            $scope.getInfo();
            $scope.getTerm();
        }, function errorCallback(response){

        });
    }
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
        $("#class_name").text(nowOperateClass);

         $http({
            method:'GET',
            url:ip+"/FacetAPI/getDomainTerm",
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
        //      url: ip+"/FacetAPI/getDomainTerm",
        //      data: {ClassName:nowOperateClass},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  for(var i=0;i<data.length;i++){
        //                     $.ajax({
        //                        type: "GET",
        //                        url: ip+"/DomainTopicAPI/getDomainTermInfo",
        //                        data: {ClassName:nowOperateClass,TermName:data[i].TermName},
        //                        dataType: "json",
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
            url:ip+"/FacetAPI/getDomainTerm",
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
        //      url: ip+"/FacetAPI/getDomainTerm",
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
        //                        //console.log(data1);
        //                        if(data1[0].FacetNum==0){
        //                        //console.log($("#"+data1[0].TermName+"a"));
        //                        $("#"+data1[0].TermName+"_a").hide();
        //                                                        }
        //                                                                   }
        //                      });
        //                 }

        //               }
        //  });
        
        
    }

    //杨宽添加，显示分面树函数
    $scope.showFacetTreeWithoutLeaves=function(className,subjectName){
         $.ajax({
             type: "GET",
             url: ip+"/AssembleAPI/getTreeByTopic",
             data: {
                ClassName:className,
                TermName:subjectName
             },
             dataType: "json",
             success: function(data){
                        //console.log(data);
                        //DisplayTrunk(data);
                        DisplayBranch(data);
                     },
             error:function(XMLHttpRequest, textStatus, errorThrown){
                    //通常情况下textStatus和errorThrown只有其中一个包含信息
                    alert(textStatus);
                    }
        });
 
    }
    

    $scope.gettopichref=function(a,b){

        $http({
            method:'GET',
            url:ip+"/FacetAPI/getDomainTermFacet1",
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
        //      url: ip+"/FacetAPI/getDomainTermFacet1",
        //      data: {ClassName:a,TermName:b},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  for(var i=0;i<data.length;i++){
        //                     $.ajax({
        //                        type: "GET",
        //                        url: ip+"/FacetAPI/getFacet1Facet2Num",
        //                        data: {ClassName:a,TermName:b,Facet1Name:data[i].FacetName},
        //                        dataType: "json",
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

    $scope.gettopicfacet=function(a,b){
        nowOperateClass=a;
        nowOperateTopic=b;

        $http({
            method:'GET',
            url:ip+"/FacetAPI/getTermFacet",
            params:{ClassName:a,TermName:b}
        }).then(function successCallback(response){
            $scope.facets=response.data;
            $("#nowtype").text("主题");
            $("#getfacet").text(" "+b+" 下分面");
            $("#addfacetname").text("主题 "+b+" 添加分面");
            $("#topictree").text("主题 "+b+" 分面树");
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/FacetAPI/getTermFacet",
        //      data: {ClassName:a,TermName:b},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //         console.log(data);
        //                  $scope.facets=data;
        //                  $("#nowtype").text("主题");
        //                  $("#getfacet").text(" "+b+" 下分面");
        //                  $("#addfacetname").text("主题 "+b+" 添加分面");
        //                  $("#topictree").text("主题 "+b+" 分面树");
        //                  // $scope.$apply();
        //               }
        //  });
    }

    $scope.getfacet1href=function(a,b,c){
        $("#"+b+"_"+c+"_info").collapse();


        $http({
            method:'GET',
            url:ip+"/FacetAPI/getDomainTermFacet2",
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
        //      url: ip+"/FacetAPI/getDomainTermFacet2",
        //      data: {ClassName:a,TermName:b,Facet1Name:c},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  if(data.length!=0){
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
        //                             //console.log(data1.Facet2Name);
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

    $scope.getfacet1facet=function(a,b,c){
        //console.log(this.id);
        nowOperateClass=a;
        nowOperateTopic=b;
        nowOperateFacet1=c;

        $http({
            method:'GET',
            url:ip+"/FacetAPI/getTermFacet1",
            params:{ClassName:a,TermName:b,Facet1Name:c}
        }).then(function successCallback(response){
            $scope.facets=response.data;
            $("#nowtype").text("一级分面");
            $("#getfacet").text(" "+c+" 下分面");
            $("#addfacetname").text("一级分面 "+c+" 添加分面");
            $("#topictree").text("主题 "+b+" 分面树");
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/FacetAPI/getTermFacet1",
        //      data: {ClassName:a,TermName:b,Facet1Name:c},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //         //console.log(data);
        //                  $scope.facets=data;
        //                  $("#nowtype").text("一级分面");
        //                  $("#getfacet").text(" "+c+" 下分面");
        //                  $("#addfacetname").text("一级分面 "+c+" 添加分面");
        //                  $("#topictree").text("主题 "+b+" 分面树");
        //                  // $scope.$apply();
        //               }
                    
        //  });
    }

    $scope.getfacet2facet=function(a,b,c,d){
        nowOperateClass=a;
        nowOperateTopic=b;
        nowOperateFacet1=c;
        nowOperateFacet2=d;

        $http({
            method:'GET',
            url:ip+"/FacetAPI/getDomainTermFacet3",
            params:{ClassName:a,TermName:b,Facet2Name:d}
        }).then(function successCallback(response){
            $scope.facets=response.data;
            $("#nowtype").text("二级分面");
            $("#getfacet").text(" "+d+" 下分面");
            $("#addfacetname").text("二级分面 "+d+" 添加分面");
            $("#topictree").text("主题 "+b+" 分面树");
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/FacetAPI/getDomainTermFacet3",
        //      data: {ClassName:a,TermName:b,Facet2Name:d},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  $scope.facets=data;
        //                  $("#nowtype").text("二级分面");
        //                  $("#getfacet").text(" "+d+" 下分面");
        //                  $("#addfacetname").text("二级分面 "+d+" 添加分面");
        //                  $("#topictree").text("主题 "+b+" 分面树");
        //               }
        //  });
    }

    $scope.getfacetinfo=function(a,b){
        if(b=="1"){

            $http({
            method:'GET',
            url:ip+"/FacetAPI/getTermFacet1Fragment",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:a}
        }).then(function successCallback(response){
            $("#facet_name").text(response.data.FacetName);
            $("#facet_layer").text(response.data.FacetLayer);
            $("#facet_fragment_num").text(response.data.FragmentNum);
            $("#choseFacet").text(a+" 信息");
        }, function errorCallback(response){

        });

         //    $.ajax({
         //     type: "GET",
         //     url: ip+"/FacetAPI/getTermFacet1Fragment",
         //     data: {ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:a},
         //     dataType: "json",
         //     async:false,
         //     success: function(data){
         //                 $("#facet_name").text(data.FacetName);
         //                 $("#facet_layer").text(data.FacetLayer);
         //                 $("#facet_fragment_num").text(data.FragmentNum);
         //                 $("#choseFacet").text(a+" 信息");
         //                 TextNum=data.FragmentTextNum;
         //                 ImageNum=data.FragmentImageNum;
         //              }
         // });
        }
        else if(b=="2"){

            $http({
            method:'GET',
            url:ip+"/FacetAPI/getTermFacet2Fragment",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:a}
        }).then(function successCallback(response){
            $("#facet_name").text(response.data.FacetName);
            $("#facet_layer").text(response.data.FacetLayer);
            $("#facet_fragment_num").text(response.data.FragmentNum);
            $("#choseFacet").text(a+" 信息");
        }, function errorCallback(response){

        });

         //    $.ajax({
         //     type: "GET",
         //     url: ip+"/FacetAPI/getTermFacet2Fragment",
         //     data: {ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:a},
         //     dataType: "json",
         //     async:false,
         //     success: function(data){
         //                 $("#facet_name").text(data.FacetName);
         //                 $("#facet_layer").text(data.FacetLayer);
         //                 $("#facet_fragment_num").text(data.FragmentNum);
         //                 $("#choseFacet").text(a+" 信息");
         //                 TextNum=data.FragmentTextNum;
         //                 ImageNum=data.FragmentImageNum;
         //              }
         // });
        }
        else{

            $http({
            method:'GET',
            url:ip+"/FacetAPI/getTermFacet3Fragment",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:a}
        }).then(function successCallback(response){
            $("#facet_name").text(response.data.FacetName);
            $("#facet_layer").text(response.data.FacetLayer);
            $("#facet_fragment_num").text(response.data.FragmentNum);
            $("#choseFacet").text(a+" 信息");
        }, function errorCallback(response){

        });

         //   $.ajax({
         //     type: "GET",
         //     url: ip+"/FacetAPI/getTermFacet3Fragment",
         //     data: {ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:a},
         //     dataType: "json",
         //     async:false,
         //     success: function(data){
         //                 $("#facet_name").text(data.FacetName);
         //                 $("#facet_layer").text(data.FacetLayer);
         //                 $("#facet_fragment_num").text(data.FragmentNum);
         //                 $("#choseFacet").text(a+" 信息");
         //                 TextNum=data.FragmentTextNum;
         //                 ImageNum=data.FragmentImageNum;
         //              }
         // }); 
        }
        
    }

    $scope.deleteFacet=function(){

    var name=document.getElementById("facet_name").innerText;
    var layer=document.getElementById("facet_layer").innerText;
    if(layer=="1"){

        $http({
            method:'GET',
            url:ip+"/FacetAPI/deleteFacet1",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:name}
        }).then(function successCallback(response){
            alert(response.data.success);
            $scope.gettopicfacet(nowOperateClass,nowOperateTopic);
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/FacetAPI/deleteFacet1",
        //      data: {ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:name},
        //      dataType: "json",
        //      //async:false,
        //      success: function(data){
        //                  alert(data.success);
        //                  $scope.gettopicfacet(nowOperateTopic);
        //               }
        //  });
    }
    else if(layer=="2"){

        $http({
            method:'GET',
            url:ip+"/FacetAPI/deleteFacet2",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:name}
        }).then(function successCallback(response){
            alert(response.data.success);
            $scope.gettopicfacet(nowOperateClass,nowOperateTopic);
        }, function errorCallback(response){

        });

        // $.ajax({
        //      type: "GET",
        //      url: ip+"/FacetAPI/deleteFacet2",
        //      data: {ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:name},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  alert(data.success);
        //               }
        //  });
    }
    else{

        $http({
            method:'GET',
            url:ip+"/FacetAPI/deleteFacet3",
            params:{ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:name}
        }).then(function successCallback(response){
            alert(response.data.success);
            $scope.gettopicfacet(nowOperateClass,nowOperateTopic);
        }, function errorCallback(response){

        });


        // $.ajax({
        //      type: "GET",
        //      url: ip+"/FacetAPI/deleteFacet3",
        //      data: {ClassName:nowOperateClass,TermName:nowOperateTopic,FacetName:name},
        //      dataType: "json",
        //      async:false,
        //      success: function(data){
        //                  alert(data.success);
        //               }
        //  });
    }
    }




    $scope.jumpFragment=function(a,b){
        setCookie("NowClass",nowOperateClass,"d900");
        setCookie("NowTopic",nowOperateTopic,"d900");
        setCookie("NowFacet1",nowOperateFacet1,"d900");
        setCookie("NowFacet",a,"d900");
        setCookie("NowFacetLayer",b,"d900");
        window.location="../fragment/index.html";
    }
});