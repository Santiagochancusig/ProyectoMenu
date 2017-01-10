
angular.module('app',[])
    .controller("ControllerUsuarios",function($scope, $http,upload) {
        var mostarlogin= false;
        var mostarNavBar=false;
        var mostarOpciones=false;
        $scope.navbarOpciones=function (id_perfil) {
            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultamenu.php",
                data: {
                    id_perfil:id_perfil},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(function (data) {
                $scope.navBar=data.DatosNavBar;
                console.log('data' + $scope.navBar);
            })
        }
        $scope.usuariologin=function (usuario,contrasena) {
                $scope.username="";
                $scope.password="";

            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaPassword.php",
                data: {
                    usuario: usuario,
                    contrasena:contrasena},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(function (data) {
                $scope.resp=data.CONSULTALOGIN;
                if($scope.resp == "" ) {
                    alert("Datos incorrectos")


                }else{
                    console.log($scope.resp[0].id_perfil);
                    if ($scope.resp[0].id_perfil >= 1) {
                        $scope.perfil = $scope.resp[0].id_perfil;
                        $scope.mostarNavBar = true;
                        $scope.mostarlogin = false;
                        $scope.navbarOpciones($scope.perfil);

                    } else {
                    }
                }

            });

        }

        $scope.showOpciones=function(show) {
            console.log(show);
            $scope.mostarlogin=show;
            $scope.mostarNavBar=show;

        };

        $scope.reloadPage=function(){
            $window.location.reload(true);
        }



        $scope.AdminUsuarios=function() {
            var request=$http.get(
                "http://localhost/Proyecto_menu/ws/consultaAdmiUsuarios.php")
            request.success(function (data) {
                $scope.users=data.CONSULTAADMIUSUARIOS;
                console.log('data' + $scope.users);
            })
        };



        $scope.getPerfil=function () {
            var request = $http.get(
                "http://localhost/Proyecto_menu/ws/consultaPerfiles.php")
            request.success(function (data) {
                $scope.perf = data.DATOSPERFIL;
                console.log('data' + $scope.perf);
            })
        }


        $scope.recargar=function (perfil) {
            $scope.perfil=perfil;
            console.log('prueba recargar'+$scope.perfil);
        }



        $scope.nuevoUsuario=function (nombre_usuario,usuario,contrasena,estado) {
            console.log('prueba recargar'+$scope.perfil);
            console.log("prueba" + nombre_usuario + usuario + contrasena);
            id_perfil=$scope.perfil;
            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaAgregarUsuario.php",
                data: {
                    nombre_usuario: nombre_usuario,
                    usuario: usuario,
                    contrasena: contrasena,
                    estado: estado,
                    id_perfil:id_perfil
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            })

        }


        $scope.modificarUsuario=function (id_usuario,nombre_usuario,usuario,contrasena,estado) {
            console.log('prueba recargar'+$scope.perfil);
            console.log("prueba" + nombre_usuario + usuario + contrasena);
            id_perfil=$scope.perfil;
            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaModificarUsuarios.php",
                data: {
                    id_usuario:id_usuario,
                    nombre_usuario: nombre_usuario,
                    usuario: usuario,
                    contrasena: contrasena,
                    estado: estado,
                    id_perfil:id_perfil
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }


        $scope.cambioEstado=function(id_usuario,estado){
            if (estado==1){
                estado=0;
            }else{
                estado=1;
            }
            var request=$http({
                method: "POST",
                url:"http://localhost/Proyecto_menu/ws/consultaCambioEstado.php",
                data:{
                    id_usuario:id_usuario,
                    estado:estado
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

        }



        $scope.getMenu=function() {
            var request=$http.get(
                "http://localhost/Proyecto_menu/ws/consultaSubMenus.php")
            request.success(function (data) {
                $scope.menus=data.CONSULTASUBMENUS;
                console.log('data' + $scope.menus);
            })
        }


        $scope.nuevoMenu=function (descripcion_menu,estado,Padre,Padre1,url) {
            console.log(descripcion_menu);
            if(Padre==1){
                Padre=null;
            }else{
                Padre=Padre1;
            }
            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaNuevoMenu.php",
                data: {
                    descripcion_menu: descripcion_menu,
                    estado: estado,
                    Padre:Padre,
                    url: url
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }



        $scope.getRelacion=function(){
            var request= $http.get(
                "http://localhost/Proyecto_menu/ws/consultaDatosRelacion.php")
            request.success(function (data){
                    $scope.rels=data.CONSULTADATOSREALCION;
                    console.log('data'+ $scope.rels);
            })


        }


        $scope.nuevaRelacion=function (id_menu,id_perfil) {
            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaNuevaRelacion.php",
                data: {
                    id_menu: id_menu,
                    id_perfil: id_perfil
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }


        $scope.cambioEstadoMenu=function (id_menu,estado) {
            if(estado==1){
                estado=0;
            }else {
                estado=1;
            }
            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaCambioEstadoMenu.php",
                data: {
                    id_menu:id_menu,
                    estado: estado
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }


        $scope.modificarMenu=function (id_menu,descripcion_menu,estado,Padre,Padre1,url) {
            console.log('moOP'+id_menu+descripcion_menu+estado+Padre+Padre1+url);
            if(Padre==1){
                Padre=null;
            }else{
                Padre=Padre1;
            }
            console.log('moOP'+id_menu+descripcion_menu+estado+Padre+Padre1+url);

            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaModificarMenu.php",
                data: {
                    id_menu:id_menu,
                    descripcion_menu: descripcion_menu,
                    estado: estado,
                    Padre:Padre,
                    url: url
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }



        $scope.modificarPerfil=function (id_perfil,nombre_perfil) {

            console.log('moOP'+id_perfil);

            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaModificarPerfil.php",
                data: {
                    id_perfil:id_perfil,
                    nombre_perfil:nombre_perfil
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }



        $scope.cambioEstadoPerfil=function (id_perfil,estado) {
            console.log('moOP'+id_perfil);
            if(estado==1){
                estado=0;
            }else{
                estado=1;
            }
            console.log('moOP'+estado);

            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaCambioEstadoperfil.php",
                data: {
                    id_perfil:id_perfil,
                    estado: estado
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }



        $scope.llamarImagen = function (id_usuario) {
            console.log("prueba" + id_usuario);
            var request=$http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaImagenes.php",
                data: {
                    id_usuario: id_usuario
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            request.success(function (data) {
                $scope.ima = data.GRAFICOS;
                console.log("Insertado" + $scope.ima.direccion);
            });
        };



        $scope.uploadFile = function(direccion,estado,id_usuario){
            var name = $scope.name;
            var file = $scope.file;
            upload.uploadFile(file, name).then(function(res){
                console.log(res);
            });
            console.log(direccion + estado + id_usuario)
            var request = $http({
                method: "POST",
                url: "http://localhost/Proyecto_menu/ws/consultaSubirImagnes.php",
                data: {
                    direccion: direccion,
                    estado: estado,
                    id_usuario: id_usuario
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }

    }
)
    .directive('uploaderModel', ["$parse", function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, iElement, iAttrs)
            {
                iElement.on("change", function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
                });
            }
        };
    }])
    .service('upload', ["$http", "$q", function ($http, $q){
        this.uploadFile = function(file, name){
            var deferred = $q.defer();
            var formData = new FormData();
            formData.append("name", name);
            formData.append("file", file);
            return $http.post("ws/consultaMoverImegenes.php", formData, {
                headers: {
                    "Content-type": undefined
                },
                transformRequest: angular.identity
            })
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(msg, code){
                    deferred.reject(msg);
                })
            return deferred.promise;
        }
    }])